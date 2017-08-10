
export const setBalance = (account, balance) => ({
    type: "SET_BALANCE",
    account,
    balance
})

export const showBalance = (account) => ({
    type: "UPDATE_BALANCE",
    account
})
