import { ethers } from "hardhat";

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;

    const lockedAmount = ethers.parseEther("0.001");

    const lock = await ethers.deployContract("Lock", [unlockTime], {
        value: lockedAmount,
    });


    await lock.waitForDeployment();

    console.log(
        `Lock with ${ethers.formatEther(
            lockedAmount
        )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
    );

    // Deploy Counter contract

    const counter = await ethers.deployContract("Counter");

    await counter.waitForDeployment();

    console.log(
        `Counter with ${ethers.formatEther(
            lockedAmount
        )}ETH and unlock timestamp ${unlockTime} deployed to ${counter.target}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
