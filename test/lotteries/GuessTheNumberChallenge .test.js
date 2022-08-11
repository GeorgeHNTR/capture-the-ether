const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GuessTheNumberChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("GuessTheNumberChallenge")).deploy({ value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});