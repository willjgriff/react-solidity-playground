import {accountBalance, updateBalanceEpic} from "../token/balance/BalanceReducers"
import {combineReducers} from "redux"
import { combineEpics } from 'redux-observable';

export const rootReducer = combineReducers({
    accountBalance
})

export const rootEpic = combineEpics(
    updateBalanceEpic
)