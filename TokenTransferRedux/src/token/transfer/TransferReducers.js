import {UPDATE_BALANCE, updateBalance} from "../balance/BalanceActions"
import {TRANSFER_FAILED, TRANSFER_FUNDS, transferFailed} from "./TransferActions"
import * as Rx from "rxjs"

const transferInitialState = {
    loading: false
}

export const transferReducer = (state = transferInitialState, action) => {
    if (action.type === TRANSFER_FUNDS) {
        return {...state, loading: true}
    } else if (action.type === TRANSFER_FAILED || action.type === UPDATE_BALANCE) {
        return {...state, loading: false}
    } else {
        return state
    }
}

const currentAccount = store => store.getState().selectedAccount.account
const tokenBridge = store => store.getState().dependencies.tokenBridge
const web3Bridge = store => store.getState().dependencies.web3Bridge

export const transferEpic = (action$, store) => {
    const transfer$ = (toAccount, value) =>
        tokenBridge(store).transfer(currentAccount(store), toAccount, value)

    const logTransfer$ = () =>
        tokenBridge(store).logTransfer(currentAccount(store))

    const transferEventNotInTx$ = (tx) => Rx.Observable.of(tx)
        .filter(tx => !web3Bridge(store).isEventLogInTransaction("Transfer", tx))
        .map(tx => transferFailed())

    return action$.ofType(TRANSFER_FUNDS)
        .flatMap(action => transfer$(action.toAccount, action.value)
            .flatMap(tx => logTransfer$()
                .map(transfer => updateBalance(currentAccount(store)))
                .merge(transferEventNotInTx$(tx)))
            .catch(error => Rx.Observable.of(transferFailed())))
}