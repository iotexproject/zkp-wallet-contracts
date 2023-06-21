import { ethers } from 'hardhat'

import { ZKPassAccountFactory } from "../typechain"

async function main() {
    const factory = (await ethers.getContract('ZKPassAccountFactory')) as ZKPassAccountFactory
    
    const tx = await factory.createAccount("test")
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
