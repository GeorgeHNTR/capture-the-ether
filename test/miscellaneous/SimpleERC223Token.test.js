const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleERC223Token", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("SimpleERC223Token")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});