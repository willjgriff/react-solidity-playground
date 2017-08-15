export const SET_BALANCE = "SET_BALANCE"
export const BALANCE_LOADING = "BALANCE_LOADING"
export const UPDATE_BALANCE = "UPDATE_BALANCE"

export const setBalance = (account, balance) => ({
    type: SET_BALANCE,
    account,
    balance
})

export const updateBalance = () => ({
    type: UPDATE_BALANCE
})
