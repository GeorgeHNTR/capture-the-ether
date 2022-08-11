const { expect } = require("chai");
const { ethers } = require("hardhat");
const keccak256 = require('keccak256');

describe.only("GuessTheSecretNumberChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("GuessTheSecretNumberChallenge")).deploy({ value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE

        const answerHash = await ethers.provider.getStorageAt(contract.address, 0);

        // Since the input parameter is of type uint8, all possible values are in the range 0 to 255, so we can easily brute force it
        for (let n = 0; n < 256; n++) {
            if ("0x".concat(keccak256(n).toString("hex")) === answerHash) {
                await contract.guess(n, { value: ethers.utils.parseEther("1") });
                break;
            }
        }
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});