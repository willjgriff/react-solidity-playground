import Contract from 'truffle-contract'
import StandardToken from '../../build/contracts/StandardToken.json'
import Rx from 'rxjs'

export default class TokenBridge {

    constructor (web3) {
        const token = Contract(StandardToken)
        token.setProvider(web3.currentProvider)

        this.web3 = web3
        this.tokenObservable = Rx.Observable
            .fromPromise(token.deployed())
            .shareReplay(1)
    }

    balanceOf(account) {
        return this.tokenObservable
            .flatMap(token => token.balanceOf(account))
            .map(balanceBigNumber => balanceBigNumber.toNumber())
    }

}