import {
    accountBalance, availableAccounts, availableAccountsEpic,
    updateBalanceEpic
} from "../token/balance/BalanceReducers"
import {combineEpics} from 'redux-observable'
import {transferEpic} from "../token/transfer/TransferReducers"
import {combineReducers} from "redux"

export const rootReducer = combineReducers({
    accountBalance,
    availableAccounts
})

export const rootEpic = combineEpics(
    updateBalanceEpic,
    availableAccountsEpic,
    transferEpic
)