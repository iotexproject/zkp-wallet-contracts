import { ethers } from 'hardhat'
import { namehash } from 'ethers/lib/utils'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    // testnet config
    const entrypoint = '0x16653fF93F0e5fEF85CE46862562a4c58B05435E'
    const nameWrapper = '0x92f0926350268a0147E36c4Dfbc4c72Eb11696cF'
    const resolver = '0x919f2508389c59fe6E896f80c2B70ff53877942B'
    const reverseRegistrar = '0x5A54492239cA85a6d17E5FC11441B8545ee8980b'
    const baseName = '.iopay.io'
    const baseNode = namehash('iopay.io')

    await deploy('ZKPassAccountFactory', {
        from: deployer,
        args: [
            entrypoint,
            nameWrapper,
            resolver,
            reverseRegistrar,
            baseName,
            baseNode
        ],
        log: true,
    })
}

func.id = 'factory'
func.tags = ['factory', 'ZKPassAccountFactory']

export default func
