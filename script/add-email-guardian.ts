import { ethers } from "hardhat"
import { namehash } from "ethers/lib/utils"
import { INS, IResolver, ZKPassAccount } from "../typechain"
import { EntryPoint } from "@account-abstraction/contracts"
import { fillUserOp, signOp } from "./utils"
import { ZKPSigner } from "./signer"
import config from './config'

async function main() {
    // @ts-ignore
    const addresses = config[network.name]

    const accountTpl = await ethers.getContractFactory("ZKPassAccount")
    const entryPoint = (await ethers.getContractAt("EntryPoint", addresses.entrypoint)) as EntryPoint
    const registry = (await ethers.getContractAt("INS", addresses.ins)) as INS
    const bundler = new ethers.Wallet(process.env.BUNDLER!, ethers.provider)

    const name = "test"
    const password = process.env.PASSWORD
    const nameHash = namehash(name + ".zkwallets.io")

    const resolverAddr = await registry.resolver(nameHash)
    if (resolverAddr === "0x0000000000000000000000000000000000000000") {
        console.log(`Can't find resolver for ${name + ".zkwallets.io"}`)
        return
    }
    const resolver = (await ethers.getContractAt("IResolver", resolverAddr)) as IResolver
    const accountAddr = await resolver.addr(nameHash)
    if (accountAddr === "0x0000000000000000000000000000000000000000") {
        console.log(`Can't resolve ${name + ".zkwallets.io"} address`)
        return
    }
    const account = (await ethers.getContractAt("ZKPassAccount", accountAddr)) as ZKPassAccount

    console.log(`add email for ${account.address}...`)

    const callData = accountTpl.interface.encodeFunctionData("execute", [
        account.address,
        0,
        // cast calldata "addEmailGuardian(bytes32)" 0x83a3351928007a2dd3f6c9385984d49c2b2761c0cb7110ba9a0a80acf3719597
        "0x99a4453183a3351928007a2dd3f6c9385984d49c2b2761c0cb7110ba9a0a80acf3719597",
    ])

    const op = {
        sender: account.address,
        callData,
        preVerificationGas: 50000,
    }

    const fullOp = await fillUserOp(op, entryPoint)

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
        fullOp,
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
    console.log(`add email guardian tx: ${tx.hash}, account: ${account.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
