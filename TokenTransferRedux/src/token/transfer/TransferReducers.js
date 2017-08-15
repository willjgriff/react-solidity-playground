
import {updateBalance} from "../balance/BalanceActions"
import {TRANSFER_FUNDS} from "./TransferActions"

export const transferEpic = (action$, store, {tokenBridge$}) => {

    const transfer = (account, value) => tokenBridge$
        .flatMap(tokenBridge => tokenBridge.transfer(account, value))

    const logTransfer = () => tokenBridge$
        .flatMap(tokenBridge => tokenBridge.logTransfer(store.getState().accountBalance.account))

    return action$.ofType(TRANSFER_FUNDS)
        .flatMap(action => transfer(action.toAccount, action.value))
        .flatMap(tx => logTransfer())
        .map(transfer => updateBalance())
}