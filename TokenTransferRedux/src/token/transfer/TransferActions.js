
export const TRANSFER_FUNDS = "TRANSFER_FUNDS"

export const transferFunds = (toAccount, value) => ({
    type: TRANSFER_FUNDS,
    toAccount,
    value
})