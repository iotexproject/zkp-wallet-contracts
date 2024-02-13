import { namehash } from 'ethers/lib/utils'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import config from '../script/config'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    // @ts-ignore
    const addresses = config[network.name]

    const baseName = '.zkwallets.io'
    const baseNode = namehash(baseName.substring(1))

    const verifier = await deploy('Verifier', {
        from: deployer,
        args: [],
        log: true
    })

    // const emailGuardian = await deploy('EmailGuardian', {
    //     from: deployer,
    //     args: [addresses.dkimVerifier],
    //     log: true
    // })

    await deploy('ZKPassAccountFactory', {
        from: deployer,
        args: [
            addresses.entrypoint,
            verifier.address,
            addresses.emailGuardian,
            addresses.nameWrapper,
            addresses.resolver,
            addresses.reverseRegistrar,
            baseName,
            baseNode
        ],
        log: true,
    })
}

func.id = 'factory'
func.tags = ['factory', 'ZKPassAccountFactory']

export default func
