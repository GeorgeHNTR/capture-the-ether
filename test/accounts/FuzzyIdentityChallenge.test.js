const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FuzzyIdentityChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("FuzzyIdentityChallenge")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});