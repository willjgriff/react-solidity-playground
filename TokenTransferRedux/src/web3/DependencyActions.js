export const INITIALISE_DEPENDENCIES = "INITIALISE_DEPENDENCIES"

export const initDependencies = (web3) => ({
    type: INITIALISE_DEPENDENCIES,
    web3
})