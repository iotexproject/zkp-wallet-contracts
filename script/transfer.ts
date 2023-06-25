import { ethers } from "hardhat"
import { namehash } from "ethers/lib/utils"

import { INS, IResolver, ZKPassAccount } from "../typechain"
import { EntryPoint } from "@account-abstraction/contracts"
import { fillUserOp, signOp } from "./utils"
import config from './config'
import { ZKPSigner } from "./signer"

async function main() {
    // @ts-ignore
    const addresses = config[network.name]

    const accountTpl = await ethers.getContractFactory("ZKPassAccount")
    const entryPoint = (await ethers.getContractAt("EntryPoint", addresses.entrypoint)) as EntryPoint
    const registry = (await ethers.getContractAt("INS", addresses.ins)) as INS
    const bundler = new ethers.Wallet(process.env.BUNDLER!, ethers.provider)
    console.log(`bundler address: ${bundler.address}`)

    const name = "test"
    const password = process.env.PASSWORD
    const nameHash = namehash(name + ".test002.io")

    const resolverAddr = await registry.resolver(nameHash)
    if (resolverAddr === "0x0000000000000000000000000000000000000000") {
        console.log(`Can't find resolver for ${name + ".test002.io"}`)
        return
    }
    const resolver = (await ethers.getContractAt("IResolver", resolverAddr)) as IResolver
    const accountAddr = await resolver.addr(nameHash)
    if (accountAddr === "0x0000000000000000000000000000000000000000") {
        console.log(`Can't resolve ${name + ".test002.io"} address`)
        return
    }
    const account = (await ethers.getContractAt("ZKPassAccount", accountAddr)) as ZKPassAccount

    const balance = await ethers.provider.getBalance(account.address)
    if (balance.lt(ethers.utils.parseEther("3"))) {
        await ethers.provider.getSigner().sendTransaction({ to: account.address, value: ethers.utils.parseEther("3") })
    }

    const callData = accountTpl.interface.encodeFunctionData("execute", [
        "0x0000000000000000000000000000000000000001",
        ethers.utils.parseEther("0.1"),
        "0x",
    ])
    const transferOp = {
        sender: account.address,
        callData
    }

    const fullCreateOp = await fillUserOp(transferOp, entryPoint)

    const stake = await entryPoint.balanceOf(account.address)
    if (stake.isZero()) {
        console.log(`deposit gas for account ${account.address}`)
        const tx = await entryPoint
            .connect(bundler)
            .depositTo(account.address, { value: ethers.utils.parseEther("10") })
        await tx.wait()
    }
    const nonce = await account.getNonce()

    const chainId = (await ethers.provider.getNetwork()).chainId
    const signedOp = await signOp(
        fullCreateOp,
        entryPoint.address,
        chainId,
        new ZKPSigner(nameHash, password!, nonce)
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
    console.log(`transfer tx: ${tx.hash}, account: ${account.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
