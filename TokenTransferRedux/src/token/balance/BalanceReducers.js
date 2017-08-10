import {setBalance} from "./BalanceActions"

const initialState = {
    account: "",
    balance: 0
}

export const accountBalance = (state = initialState, action) => {
    if (action.type === "SET_BALANCE") {
        return {...state, account: action.account, balance: action.balance}
    } else {
        return state
    }
}

export const updateBalanceEpic = (action$, store, {tokenBridge$, web3Bridge$}) => {

    // let balanceOf$ = coinbase => tokenBridge$
    //     .flatMap(tokenBridge => tokenBridge.balanceOf(coinbase))
    //     .map(balance => ({coinbase, balance}))
    //
    // return action$.ofType("UPDATE_BALANCE")
    //     .flatMap(action => web3Bridge$)
    //     .flatMap(web3Bridge => web3Bridge.getCoinbase())
    //     .flatMap(coinbase => balanceOf$(coinbase))
    //     .map(({coinbase, balance}) => setBalance(coinbase, balance))

    return action$.ofType("UPDATE_BALANCE")
        // .flatMap(() => web3Bridge$)
    //     .flatMap(web3Bridge => web3Bridge.getCoinbase())
        // .flatMap(coinbase => balanceOf$(coinbase))
        .map(() => setBalance("asfda", 23))
}