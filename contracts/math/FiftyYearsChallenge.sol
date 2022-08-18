// pragma solidity ^0.4.22;
pragma solidity ^0.4.21;

// import "hardhat/console.sol";

contract FiftyYearsChallenge {
    struct Contribution {
        uint256 amount;
        uint256 unlockTimestamp;
    }
    Contribution[] queue;
    uint256 head;

    address owner;

    function FiftyYearsChallenge(address player) public payable {
        require(msg.value == 1 ether);

        owner = player;
        queue.push(Contribution(msg.value, now + 50 years));
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function upsert(uint256 index, uint256 timestamp) public payable {
        require(msg.sender == owner);

        if (index >= head && index < queue.length) {
            // Update existing contribution amount without updating timestamp.
            Contribution storage contribution = queue[index];
            contribution.amount += msg.value;
        } else {
            // Append a new contribution. Require that each contribution unlock
            // at least 1 day after the previous one.
            require(
                timestamp >= queue[queue.length - 1].unlockTimestamp + 1 days
            );

            contribution.amount = msg.value;
            contribution.unlockTimestamp = timestamp;

            // console.log(msg.value);
            // console.log(contribution.amount);
            queue.push(contribution);
            // console.log(msg.value);
            // console.log(contribution.amount); 
            //                         ^ incremented by 1 because contribution.amount is a pointer to the queue.length (storage slot )
            //                         and .push increments the length before pushing the contribution
        }
    }

    function withdraw(uint256 index) public {
        require(msg.sender == owner);
        require(now >= queue[index].unlockTimestamp);

        // Withdraw this and any earlier contributions.
        uint256 total = 0;
        for (uint256 i = head; i <= index; i++) {
            total += queue[i].amount;

            // Reclaim storage.
            delete queue[i];
        }

        // // Move the head of the queue forward so we don't have to loop over
        // // already-withdrawn contributions.
        head = index + 1;

        // console.log(total);
        msg.sender.transfer(total);
    }
}
