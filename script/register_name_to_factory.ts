import { ethers, network } from 'hardhat'
import { namehash } from 'ethers/lib/utils'
import { keccak256 } from 'js-sha3'

import { IRegistrar, IResolver } from "../typechain"
import config from './config'

const DAY = 24 * 60 * 60
const REGISTRATION_TIME = 365 * DAY

async function main() {
    // @ts-ignore
    const addresses = config[network.name]

    const controller = (await ethers.getContractAt("IRegistrar", addresses.registrar)) as IRegistrar
    const resolver = (await ethers.getContractAt("IResolver", addresses.resolver)) as IResolver
    const factory = await ethers.getContract('ZKPassAccountFactory')
    const owner = factory.address

    const label = 'zkwallet'
    const name = label + '.io'
    const node = namehash(name)
    const secret = '0x' + keccak256('secret')

    const commitment = await controller.makeCommitment(
        label,
        owner,
        REGISTRATION_TIME,
        secret,
        resolver.address,
        [
            // @ts-ignore
            resolver.interface.encodeFunctionData('setAddr(bytes32,address)', [
                node,
                owner,
            ]),
        ],
        true,
        0,
    )

    const price = await controller.rentPrice(label, REGISTRATION_TIME)

    console.log(`commit commitment: ${commitment} ...`)
    await controller.commit(commitment)

    console.log(`sleep for activation commitment ...`)
    await new Promise(f => setTimeout(f, 60000))
    console.log(`register name: ${node} ...`)
    const tx = await controller.register(
        label,
        owner,
        REGISTRATION_TIME,
        secret,
        resolver.address,
        [
            // @ts-ignore
            resolver.interface.encodeFunctionData('setAddr(bytes32,address)', [
                node,
                owner,
            ]),
        ],
        true,
        0, {
            value: price.base.add(price.premium)
        }
    )
    console.log(`completed name register with tx: ${tx.hash}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
