// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Counter {
    uint256 private count = 0;

    function increment() public {
        count += 1;
    }

    function decrement() public {
        if (count > 0) {
            count -= 1;
        }
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}