import {
    SET_AVAILABLE_ACCOUNTS, SET_BALANCE, setAvailableAccounts, setBalance, UPDATE_AVAILABLE_ACCOUNTS,
    UPDATE_BALANCE, updateBalance
} from "./BalanceActions"
import * as Rx from "rxjs"

// TODO: Reducers and epics should probably be split up, for now though this is easier to read.
const accountInitialState = {
    account: "",
    balance: 0,
}

export const accountBalance = (state = accountInitialState, action) => {
    switch (action.type) {
        case SET_BALANCE:
            return {...state, balance: action.balance}
        case UPDATE_BALANCE:
            return {...state, account: action.account}
        default:
            return state
    }
}

export const availableAccounts = (state = [], action) => {
    if (action.type === SET_AVAILABLE_ACCOUNTS) {
        return action.accounts
    } else {
        return state
    }
}

export const availableAccountsEpic = (action$, store) => {
    const updateBalanceAndSetAccounts$ = accounts =>
        Rx.Observable.of(updateBalance(accounts[0]), setAvailableAccounts(accounts))

    const accounts$ = () => store.getState().dependencies.web3Bridge.getAccounts()

    return action$.ofType(UPDATE_AVAILABLE_ACCOUNTS)
        .flatMap(action => accounts$())
        .flatMap(accounts => updateBalanceAndSetAccounts$(accounts))
}

export const updateBalanceEpic = (action$, store) => {
    const balanceOf$ = account => store.getState().dependencies.tokenBridge.balanceOf(account)

    return action$.ofType(UPDATE_BALANCE)
        .flatMap(action => balanceOf$(action.account))
        .map(balance => setBalance(balance))
}