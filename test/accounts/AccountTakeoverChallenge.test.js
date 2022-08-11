const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AccountTakeoverChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("AccountTakeoverChallenge")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});