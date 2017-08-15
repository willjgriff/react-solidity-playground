export const SET_BALANCE = "SET_BALANCE"
export const UPDATE_BALANCE = "UPDATE_BALANCE"
export const SET_AVAILABLE_ACCOUNTS = "SET_AVAILABLE_ACCOUNTS"
export const UPDATE_AVAILABLE_ACCOUNTS = "UPDATE_AVAILABLE_ACCOUNTS"

export const setBalance = (account, balance) => ({
    type: SET_BALANCE,
    account,
    balance
})

export const updateBalance = () => ({
    type: UPDATE_BALANCE
})

export const setAvailableAccounts = (accounts) => ({
    type: SET_AVAILABLE_ACCOUNTS,
    accounts
})

export const updateAvailableAccounts = () => ({
    type: UPDATE_AVAILABLE_ACCOUNTS
})