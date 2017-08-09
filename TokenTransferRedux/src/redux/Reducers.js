
const initialState = {
    account: "",
    balance: 0
}

const setBalance = (state = initialState, action) => {
    if (action.type === "SET_BALANCE") {
        return {...state, balance: action.value}
    } else {
        return state
    }
}