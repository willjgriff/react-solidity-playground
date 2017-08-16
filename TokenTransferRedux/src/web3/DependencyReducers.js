import {INITIALISE_DEPENDENCIES} from "./DependencyActions"
import Web3Bridge from "./Web3Bridge"
import TokenBridge from "./TokenBridge"

const initialState = {
    web3: null,
    web3Bridge: null,
    tokenBridge: null
}

export const dependencyReducer = (state = initialState, action) => {
    if (action.type === INITIALISE_DEPENDENCIES) {
        return {
            ...state,
            web3: action.web3,
            web3Bridge: new Web3Bridge(action.web3),
            tokenBridge: new TokenBridge(action.web3)
        }
    } else {
        return state
    }
}