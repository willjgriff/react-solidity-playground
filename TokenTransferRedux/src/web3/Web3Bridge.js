import Rx from "rxjs"

export default class Web3Bridge {

    constructor(web3) {
        this.web3 = web3
    }

    getAccounts() {
        return Rx.Observable.create(observer => {
            this.web3.eth.getAccounts((error, accounts) => this.web3ObservableFunction(observer, error, accounts))
        })
    }

    getCoinbase() {
        return Rx.Observable.create(observer => {
            this.web3.eth.getCoinbase((error, coinbase) => this.web3ObservableFunction(observer, error, coinbase))
        })
    }

    web3ObservableFunction = (observer, error, response) => {
        if (!error) {
            observer.next(response)
        } else {
            observer.error(error)
        }
    }

}