const StandardToken = artifacts.require("./StandardToken.sol")

module.exports = function (deployer) {
    deployer.deploy(StandardToken, 1000)
}
