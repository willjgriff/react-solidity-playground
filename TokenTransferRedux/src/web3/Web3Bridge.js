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

    observableFromEvent(contractEvent) {
        return Rx.Observable.create(observer => {
            contractEvent.watch((error, response) => this.web3ObservableFunction(observer, error, response))
        })
    }

    web3ObservableFunction = (observer, error, response) => {
        if (!error) {
            observer.next(response)
        } else {
            observer.error(error)
        }
    }

    isEventLogInTransaction(event, tx) {
        return tx.logs
            .filter(log => log.event === event)
            .length > 0
    }
}