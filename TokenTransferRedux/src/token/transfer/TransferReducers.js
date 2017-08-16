import {UPDATE_BALANCE, updateBalance} from "../balance/BalanceActions"
import {TRANSFER_FAILED, TRANSFER_FUNDS, transferFailed} from "./TransferActions"
import * as Rx from "rxjs"

const transferInitialState = {
    loading: false
}

export const transferState = (state = transferInitialState, action) => {
    if (action.type === TRANSFER_FUNDS) {
        return {...state, loading: true}
    } else if (action.type === TRANSFER_FAILED || action.type === UPDATE_BALANCE) {
        return {...state, loading: false}
    } else {
        return state
    }
}

const getCurrentAccount = store => store.getState().selectedAccount.account

export const transferEpic = (action$, store) => {

    const transfer$ = (toAccount, value) =>
        store.getState().dependencies.tokenBridge.transfer(getCurrentAccount(store), toAccount, value)

    const logTransfer$ = () =>
        store.getState().dependencies.tokenBridge.logTransfer(getCurrentAccount(store))

    const transferEventNotInTx$ = (tx) => Rx.Observable.of(tx)
        .filter(tx => !store.getState().dependencies.web3Bridge.isEventLogInTransaction("Transfer", tx))
        .map(tx => transferFailed())

    return action$.ofType(TRANSFER_FUNDS)
        .flatMap(action => transfer$(action.toAccount, action.value))
        .flatMap(tx => logTransfer$()
            .map(transfer => updateBalance(getCurrentAccount(store)))
            .merge(transferEventNotInTx$(tx)))
        .catch(error => Rx.Observable.of(transferFailed()))
}