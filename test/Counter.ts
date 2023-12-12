import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { Contract } from "ethers";
import { Counter } from "../typechain-types/Counter";

describe("Counter", function () {
  let counter: Counter;
  
  beforeEach(async function () {
    const CounterFactory = await ethers.getContractFactory("Counter");
    counter = await CounterFactory.deploy();
  });

  it("Should return initial count 0", async function () {
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should increment the count", async function () {
    await counter.increment();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Should decrement the count", async function () {
    await counter.increment();
    await counter.decrement();
    expect(await counter.getCount()).to.equal(0);
  });
});