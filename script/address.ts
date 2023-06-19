import { ethers, network } from "hardhat"
import { hexConcat } from "ethers/lib/utils"

import { ZKPassAccountFactory } from "../typechain"
import { EntryPoint } from "@account-abstraction/contracts"
import config from './config'

async function main() {
    const factory = (await ethers.getContract("ZKPassAccountFactory")) as ZKPassAccountFactory

    // @ts-ignore
    const addresses = config[network.name]

    const name = "test"
    const address = await factory.getAddress(name)

    const initCode = hexConcat([
        factory.address,
        factory.interface.encodeFunctionData("createAccount", [name]),
    ])
    const entryPoint = (await ethers.getContractAt("EntryPoint", addresses.entrypoint)) as EntryPoint

    const entryReturnAddress = await entryPoint.callStatic
        .getSenderAddress(initCode)
        .catch((e) => e.errorArgs.sender)

    if (address != entryReturnAddress) {
        return console.error("account address dismatch")
    }

    console.log(`${name} account address: ${address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
