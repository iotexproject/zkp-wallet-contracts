import { defaultAbiCoder, hexConcat, hexlify, keccak256, toUtf8Bytes } from "ethers/lib/utils"
import { AccountSigner } from "./utils"
import { prove } from "./prover"

export class ZKPSigner implements AccountSigner {
    private readonly SNARK_SCALAR_FIELD = BigInt("0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001")
    private passport: bigint
    private nonce?: bigint

    constructor(nameHash:string, password: string, nonce?: number) {
        this.passport = BigInt(keccak256(
            hexConcat([nameHash, hexlify(toUtf8Bytes(password))])
        ))
        if (nonce != null) {
            this.nonce = BigInt(0)
        }
    }

    public setNonce(nonce: bigint) {
        this.nonce = nonce
    }

    async sign(opHash: string): Promise<string> {
        if (this.nonce == null) {
            throw new Error("nonce is null")
        }

        let op = BigInt(hexlify(opHash))
        op %= this.SNARK_SCALAR_FIELD

        const passport = this.passport - this.nonce;
        const {proof, publicSignals} = await prove(
            this.nonce,
            op,
            passport
        )

        const signature = defaultAbiCoder.encode(
            ["uint256","uint256","uint256","uint256","uint256","uint256","uint256","uint256","uint256"],
            [proof.pi_a[0], proof.pi_a[1], proof.pi_b[0][1], proof.pi_b[0][0], proof.pi_b[1][1], proof.pi_b[1][0], proof.pi_c[0], proof.pi_c[1], publicSignals[1]]
        )
        return signature
    }
}
