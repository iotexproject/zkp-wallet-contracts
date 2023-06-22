import { ethers, network } from "hardhat"
import { hexConcat, hexlify, keccak256, namehash, toUtf8Bytes } from "ethers/lib/utils"

import { ZKPassAccountFactory } from "../typechain"
import { EntryPoint } from "@account-abstraction/contracts"
import config from './config'
import { prove } from "./prover"

async function main() {
    const factory = (await ethers.getContract("ZKPassAccountFactory")) as ZKPassAccountFactory

    // @ts-ignore
    const addresses = config[network.name]

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

    const address = await factory.getAddress(name, publicSignals[0])

    const initCode = hexConcat([
        factory.address,
        factory.interface.encodeFunctionData("createAccount", [name, publicSignals[0]]),
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
