const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GuessTheNewNumberChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("GuessTheNewNumberChallenge")).deploy({ value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        const helper = await (await ethers.getContractFactory("GuessTheNewNumberHelper")).deploy();
        await helper.exploit(contract.address, { value: ethers.utils.parseEther("1") });
        await helper.withdrawAllFunds();
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});