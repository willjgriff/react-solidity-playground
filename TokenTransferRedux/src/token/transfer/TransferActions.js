
export const TRANSFER_FUNDS = "TRANSFER_FUNDS"
export const TRANSFER_FAILED = "TRANSFER_FAILED"

export const transferFunds = (toAccount, value) => ({
    type: TRANSFER_FUNDS,
    toAccount,
    value
})

export const transferFailed = () => ({
    type: TRANSFER_FAILED
})