import { hexConcat, hexlify, keccak256, namehash, toUtf8Bytes } from "ethers/lib/utils"

import { prove } from "./prover"

async function main() {
    const name = "test"
    const password = process.env.PASSWORD
    const nameHash = namehash(name + ".zkwallets.io")

    const passport = BigInt(keccak256(
        hexConcat([nameHash, hexlify(toUtf8Bytes(password!))])
    ))
    const {publicSignals} = await prove(
        BigInt(0), // nonce
        BigInt(0), // opHash
        passport
    )

    console.log(`passHash: ${hexlify(BigInt(publicSignals[0]))}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
