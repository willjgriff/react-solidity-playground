import {
    SET_AVAILABLE_ACCOUNTS, SET_BALANCE, setAvailableAccounts, setBalance, UPDATE_AVAILABLE_ACCOUNTS,
    UPDATE_BALANCE
} from "./BalanceActions"
import {TRANSFER_FUNDS} from "../transfer/TransferActions"

// TODO: Reducers and epics should probably be split up, for now this is easier to read though.
const accountInitialState = {
    account: "",
    balance: 0,
    loading: true
}

export const accountBalance = (state = accountInitialState, action) => {
    if (action.type === SET_BALANCE) {
        return {...state, account: action.account, balance: action.balance, loading: false}
    } else if (action.type === TRANSFER_FUNDS) {
        return {...state, loading: true}
    } else {
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

export const availableAccountsEpic = (action$, store, {web3Bridge$}) => {
    const accounts$ = web3Bridge$
        .flatMap(web3Bridge => web3Bridge.getAccounts())

    return action$.ofType(UPDATE_AVAILABLE_ACCOUNTS)
        .flatMap(action => accounts$)
        .map(accounts => setAvailableAccounts(accounts))
}

export const updateBalanceEpic = (action$, store, {tokenBridge$, web3Bridge$}) => {
    const balanceOf$ = coinbase => tokenBridge$
        .flatMap(tokenBridge => tokenBridge.balanceOf(coinbase))
        .map(balance => ({coinbase, balance}))

    const coinbase$ = web3Bridge$
        .flatMap(web3Bridge => web3Bridge.getCoinbase())

    return action$.ofType(UPDATE_BALANCE)
        .flatMap(action => coinbase$)
        .flatMap(coinbase => balanceOf$(coinbase))
        .map(({coinbase, balance}) => setBalance(coinbase, balance))
}