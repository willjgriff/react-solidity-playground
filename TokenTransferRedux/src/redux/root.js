import {
    accountBalanceReducer, availableAccountsReducer, availableAccountsEpic,
    updateBalanceEpic
} from "../token/balance/BalanceReducers"
import {combineEpics} from 'redux-observable'
import {transferEpic, transferReducer} from "../token/transfer/TransferReducers"
import {combineReducers} from "redux"
import {dependencyReducer} from "../web3/DependencyReducers"
import {routerReducer} from "react-router-redux"

export const rootReducer = combineReducers({
    router: routerReducer,
    dependencies: dependencyReducer,
    selectedAccount: accountBalanceReducer,
    availableAccounts: availableAccountsReducer,
    transfer: transferReducer
})

export const rootEpic = combineEpics(
    availableAccountsEpic,
    updateBalanceEpic,
    transferEpic
)