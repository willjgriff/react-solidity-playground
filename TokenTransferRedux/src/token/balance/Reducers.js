
const initialState = {
    account: "",
    balance: 0
}

export const setBalance = (state = initialState, action) => {
    if (action.type === "SET_BALANCE") {
        return {...state, balance: action.value}
    } else {
        return state
    }
}