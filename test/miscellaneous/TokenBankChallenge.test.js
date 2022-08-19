const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBankChallenge", async function () {
    let player;
    let contract;

    before(async function () {
        [, player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("TokenBankChallenge")).deploy(player.address);
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});