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
            console.log("Trans Event")
            observer.next(response)
        } else {
            observer.error(error)
        }
    }

    observableFromEvent(contractEvent) {
        return Rx.Observable.create(observer => {
            contractEvent.watch((error, response) => {
                if (!error) {
                    observer.next(response)
                } else {
                    observer.error(error)
                }
                contractEvent.stopWatching()
            })
        })
    }

    isEventLogInTransaction(event, tx) {
        return tx.logs
            .filter(log => log.event === event)
            .length > 0
    }
}