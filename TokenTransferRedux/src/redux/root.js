import {
    accountBalance, availableAccounts, availableAccountsEpic,
    updateBalanceEpic
} from "../token/balance/BalanceReducers"
import {combineEpics} from 'redux-observable'
import {transferEpic, transferState} from "../token/transfer/TransferReducers"
import {combineReducers} from "redux"
import {dependencyReducer} from "../web3/DependencyReducers"

export const rootReducer = combineReducers({
    dependencies: dependencyReducer,
    selectedAccount: accountBalance,
    availableAccounts,
    transfer: transferState
})

export const rootEpic = combineEpics(
    updateBalanceEpic,
    availableAccountsEpic,
    transferEpic
)