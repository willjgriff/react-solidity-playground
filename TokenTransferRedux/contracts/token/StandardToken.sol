pragma solidity ^0.4.11;

import "./ERC20.sol";
import "../utils/SafeMath.sol";

// Copied from OpenZeppelin
contract StandardToken is ERC20 {

	using SafeMath for uint256;

	mapping(address => uint256) balances;
	mapping(address => mapping(address => uint256)) allowed;

	function StandardToken(uint _totalSupply) {
		totalSupply = _totalSupply;
		balances[msg.sender] = totalSupply;
	}

	/**
	* @dev transfer token for a specified address
	* @param _to The address to transfer to.
	* @param _value The amount to be transferred.
	*/
	function transfer(address _to, uint256 _value) returns (bool) {
		balances[msg.sender] = balances[msg.sender].sub(_value);
		balances[_to] = balances[_to].add(_value);
		Transfer(msg.sender, _to, _value);
		return true;
	}

	/**
	* @dev Gets the balance of the specified address.
	* @param _owner The address to query the the balance of. 
	* @return An uint256 representing the amount owned by the passed address.
	*/
	function balanceOf(address _owner) constant returns (uint256 balance) {
		return balances[_owner];
	}

	/**
	* @dev Transfer tokens from one address to another
	* @param _from address The address which you want to send tokens from
	* @param _to address The address which you want to transfer to
	* @param _value uint256 the amout of tokens to be transfered
	*/
	function transferFrom(address _from, address _to, uint256 _value) returns (bool) {
		var _allowance = allowed[_from][msg.sender];

		// Check is not needed because sub(_allowance, _value) will already revert if this condition is not met
		// if (_value > _allowance) revert();

		balances[_to] = balances[_to].add(_value);
		balances[_from] = balances[_from].sub(_value);
		allowed[_from][msg.sender] = _allowance.sub(_value);
		Transfer(_from, _to, _value);
		return true;
	}

	/**
	* @dev Aprove the passed address to spend the specified amount of tokens on behalf of msg.sender.
	* @param _spender The address which will spend the funds.
	* @param _value The amount of tokens to be spent.
	*/
	function approve(address _spender, uint256 _value) returns (bool) {

		// To change the approve amount you first have to reduce the addresses`
		//  allowance to zero by calling `approve(_spender, 0)` if it is not
		//  already 0 to mitigate the race condition described here:
		//  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
		if ((_value != 0) && (allowed[msg.sender][_spender] != 0)) revert();

		allowed[msg.sender][_spender] = _value;
		Approval(msg.sender, _spender, _value);
		return true;
	}

	/**
	 * @dev Function to check the amount of tokens that an owner allowed to a spender.
	 * @param _owner address The address which owns the funds.
	 * @param _spender address The address which will spend the funds.
	 * @return A uint256 specifing the amount of tokens still avaible for the spender.
	 */
	function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
		return allowed[_owner][_spender];
	}
}