import Rx from 'rxjs/Rx'

export default class Web3Utils {

    constructor(web3) {
        this.web3 = web3
    }

    getAccounts() {
        return Rx.Observable
            .from(this.web3.eth.accounts)
            .do(account => console.log(account))
    }

    getCoinbase() {
        return Rx.Observable
            .create(observer => {
                this.web3.eth.getCoinbase((error, response) => {
                    if (!error) {
                        observer.next(response)
                    } else {
                        observer.error(error)
                    }
                })
            })
    }

    getCurrentBlockNumber() {
        return Rx.Observable.create(observer => {
            this.web3.eth.getBlockNumber((error, response) => {
                if (!error) {
                    observer.next(response)
                } else {
                    observer.error(error)
                }
            })
        })
    }

    observableFromEvent(contractEvent) {
        return Rx.Observable.create(observer => {
            contractEvent.watch((error, response) => {
                if (!error) {
                    observer.next(response)
                } else {
                    observer.error(error)
                }
            })
        })
    }

    isEventLogInTransaction(event, tx) {
        return tx.logs
            .filter(log => log.event === event)
            .length > 0
    }
}
