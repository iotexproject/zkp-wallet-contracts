import { ethers } from "hardhat"

import { ZKPassAccountFactory } from "../typechain"
import { EntryPoint } from "@account-abstraction/contracts"
import { fillUserOp, signOp } from "./utils"
import config from './config'
import { ZKPAccount, ZKPSigner } from "./userop"
import { Client, Presets } from "userop"

async function main() {
    // @ts-ignore
    const addresses = config[network.name]

    const rpc = "https://babel-api.testnet.iotex.io"
    const bundlerRpc = "https://bundler.testnet.w3bstream.com"
    const entryPoint = (await ethers.getContractAt("EntryPoint", addresses.entrypoint)) as EntryPoint

    const name = "test1"
    const password = process.env.PASSWORD
    const signer = new ZKPSigner(name, password!, 0)

    const client = await Client.init(rpc, {
        entryPoint: entryPoint.address,
        overrideBundlerRpc: bundlerRpc,
    })
    const accountBuilder = await ZKPAccount.init(signer, rpc, {
        overrideBundlerRpc: bundlerRpc,
        entryPoint: entryPoint.address,
        paymasterMiddleware: Presets.Middleware.verifyingPaymaster(
            // paymaster rpc
            `https://paymaster.testnet.w3bstream.com/rpc/${process.env.API_KEY}`,
            ""
        ),
    })

    const account = accountBuilder.getSender()
    const response = await client.sendUserOperation(accountBuilder)
    console.log(`Create ${account} ophash: ${response.userOpHash}`)
    const userOperationEvent = await response.wait()
    console.log(`Create ${account} txhash: ${userOperationEvent?.transactionHash}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
