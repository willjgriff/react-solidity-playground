import {accountBalance, updateCoinbaseBalanceEpic} from "../token/balance/BalanceReducers"
import {combineReducers} from ""
import combineEpics from "redux-observable"

export const rootReducer = combineReducers({
    accountBalance
})

export const rootEpic = combineEpics({
    updateBalanceEpic: updateCoinbaseBalanceEpic
})