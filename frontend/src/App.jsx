import { useEffect, useState } from 'react';
import contractABI from "./Counter.json";
import { ethers } from 'ethers';


function App() {
    const [count, setCount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function loadContract() {
            // Replace with your contract's address
            const { ethereum } = window;
            let signer = null;
            let provider;
            if (!ethereum) {
                alert("Install Metamask");
                try {
                    await ethereum.enable();
                } catch {
                    alert("User denied account access...");
                    return;
                }
                return;
            } 
            provider = new ethers.BrowserProvider(ethereum)
            signer = await provider.getSigner();

            const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
            // Create a new ethers.js instance
            const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

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
