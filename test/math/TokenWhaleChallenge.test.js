const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenWhaleChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("TokenWhaleChallenge")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});