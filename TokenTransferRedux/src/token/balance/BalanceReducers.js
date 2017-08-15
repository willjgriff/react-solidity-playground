import {SET_BALANCE, setBalance, UPDATE_BALANCE} from "./BalanceActions"
import {TRANSFER_FUNDS} from "../transfer/TransferActions"

const initialState = {
    account: "",
    balance: 0,
    loading: true
}

export const accountBalance = (state = initialState, action) => {
    if (action.type === SET_BALANCE) {
        return {...state, account: action.account, balance: action.balance, loading: false}
    } else if (action.type === TRANSFER_FUNDS) {
        return {...state, loading: true}
    } else {
        return state
    }
}

export const updateBalanceEpic = (action$, store, {tokenBridge$, web3Bridge$}) => {

    const balanceOf$ = coinbase => tokenBridge$
        .flatMap(tokenBridge => tokenBridge.balanceOf(coinbase))
        .map(balance => ({coinbase, balance}))

    const getCoinbase$ = () => web3Bridge$
        .flatMap(web3Bridge => web3Bridge.getCoinbase())

    return action$.ofType(UPDATE_BALANCE)
        .flatMap(action => getCoinbase$())
        .flatMap(coinbase => balanceOf$(coinbase))
        .map(({coinbase, balance}) => setBalance(coinbase, balance))
}