import Contract from 'truffle-contract'
import StandardToken from '../../build/contracts/StandardToken.json'
import Rx from 'rxjs'
import Web3Bridge from "./Web3Bridge"

export default class TokenBridge {

    constructor(web3) {
        const token = Contract(StandardToken)
        token.setProvider(web3.currentProvider)

        this.web3 = web3
        this.web3Bridge = new Web3Bridge(web3)
        this.token$ = Rx.Observable
            .fromPromise(token.deployed())
            .shareReplay(1)
    }

    balanceOf(account) {
        return this.token$
            .flatMap(token => token.balanceOf(account))
            .map(balanceBigNumber => balanceBigNumber.toNumber())
    }

    transfer(fromAccount, toAccount, value) {
        return this.token$
            .flatMap(token => token.transfer(toAccount, value, {from: fromAccount}))
    }

    logTransfer(fromAccount) {
        return this.token$
            .flatMap(token => this.web3Bridge.observableFromEvent(token.Transfer({from: fromAccount})))
            .map(event => ({from: event.args.from, to: event.args.to, value: event.args.value}))
    }

}