// pragma solidity ^0.4.22;
pragma solidity ^0.4.21;

// import "hardhat/console.sol";

contract MappingChallenge {
    bool public isComplete;
    uint256[] map;

    function set(uint256 key, uint256 value) public {
        // Expand dynamic array as needed
        if (map.length <= key) {
            // console.log(map.length);
            map.length = key + 1;
        }

        // console.log(map.length);
        map[key] = value;
    }

    function get(uint256 key) public view returns (uint256) {
        return map[key];
    }
}
