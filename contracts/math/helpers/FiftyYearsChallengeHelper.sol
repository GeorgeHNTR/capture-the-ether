pragma solidity ^0.4.21;

contract FiftyYearsChallengeHelper {
    function FiftyYearsChallengeHelper(address target) public payable {
        selfdestruct(target);
    }
}
