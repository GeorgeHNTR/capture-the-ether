const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PublicKeyChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("PublicKeyChallenge")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});