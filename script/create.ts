import { ethers } from "hardhat"
import { hexConcat, hexlify, keccak256, namehash, resolveProperties, toUtf8Bytes } from "ethers/lib/utils"

import { ZKPassAccountFactory } from "../typechain"
import { EntryPoint } from "@account-abstraction/contracts"
import { fillUserOp, signOp } from "./utils"
import config from './config'
import { ZKPSigner } from "./signer"
import { prove } from "./prover"

async function main() {
    // @ts-ignore
    const addresses = config[network.name]

    const factory = (await ethers.getContract("ZKPassAccountFactory")) as ZKPassAccountFactory
    const entryPoint = (await ethers.getContractAt("EntryPoint", addresses.entrypoint)) as EntryPoint
    const bundler = new ethers.Wallet(process.env.BUNDLER!, ethers.provider)
    console.log(`bundler address: ${bundler.address}`)

    const name = "test"
    const password = process.env.PASSWORD
    const nameHash = namehash(name + ".test002.io")
    const passport = BigInt(keccak256(
        hexConcat([nameHash, hexlify(toUtf8Bytes(password!))])
    ))
    const {publicSignals} = await prove(
        BigInt(0), // nonce
        BigInt(0), // opHash
        passport
    )
    const account = await factory.getAddress(name, publicSignals[0])

    const initCode = hexConcat([
        factory.address,
        factory.interface.encodeFunctionData("createAccount", [name, publicSignals[0]]),
    ])
    const createOp = {
        sender: account,
        initCode: initCode,
    }

    const fullCreateOp = await fillUserOp(createOp, entryPoint)

    const stake = await entryPoint.balanceOf(account)
    if (stake.isZero()) {
        console.log(`deposit gas for account ${account}`)
        const tx = await entryPoint
            .connect(bundler)
            .depositTo(account, { value: ethers.utils.parseEther("10") })
        await tx.wait()
    }

    const chainId = (await ethers.provider.getNetwork()).chainId
    const signedOp = await signOp(
        fullCreateOp,
        entryPoint.address,
        chainId,
        new ZKPSigner(nameHash, password!, 0)
    )

    const err = await entryPoint.callStatic.simulateValidation(signedOp).catch((e) => e)
    if (err.errorName === "FailedOp") {
        console.error(`simulate op error ${err.errorArgs.at(-1)}`)
        return
    } else if (err.errorName !== "ValidationResult") {
        console.error(`unknow error ${err}`)
        return
    }
    console.log(`simulate op success`)

    const tx = await entryPoint.connect(bundler).handleOps([signedOp], bundler.address)
    console.log(`create account tx: ${tx.hash}, account: ${account}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
