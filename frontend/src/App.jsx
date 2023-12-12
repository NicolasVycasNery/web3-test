import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from './Counter.json';


function App() {
    const [count, setCount] = useState(null);
    const [contract, setContract] = useState(null);
  
    useEffect(() => {
      async function loadContract() {
        // Replace with your contract's ABI, ABI is the array you can find in Remix
        //// Replace with your contract's address
        const contractAddress = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
  
        const provider = new ethers.providers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
        setContract(contract);
      }
  
      loadContract();
    }, []);
  
    useEffect(() => {
      async function loadCount() {
        if (contract) {
          const count = await contract.getCount();
          setCount(count.toNumber());
        }
      }
  
      loadCount();
    }, [contract]);
  
    const increment = async () => {
      if (contract) {
        await contract.increment();
        const count = await contract.getCount();
        setCount(count.toNumber());
      }
    };
  
    const decrement = async () => {
      if (contract) {
        await contract.decrement();
        const count = await contract.getCount();
        setCount(count.toNumber());
      }
    };
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div>
            <div className="text-xl font-medium text-black">Counter: {count}</div>
            <p className="text-gray-500">You can increment or decrement the counter using the buttons below.</p>
            <div className="flex mt-4">
              <button onClick={increment} className="mr-2 py-2 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-400">Increment</button>
              <button onClick={decrement} className="py-2 px-4 bg-red-500 text-white text-sm rounded hover:bg-red-400">Decrement</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default App
