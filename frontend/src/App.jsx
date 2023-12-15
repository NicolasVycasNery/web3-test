import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import contractABI from "./Counter.json";

// Replace with your contract's address
const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const RPC_URL = "http://127.0.0.1:8545/";

async function loadWeb3() {
    let web3Provider;
    // Modern dapp browsers...
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3Provider = window.ethereum;
        } catch {
            alert("User denied account access...");
            return;
        }
    }
    // Legacy dapp browsers..
    else {
        web3Provider = new ethers.providers.Web3Provider(
            window.web3.currentProvider
        );
    }

    const provider = new ethers.JsonRpcProvider(
        RPC_URL
    )
    const signer = await provider.getSigner(
        window.ethereum.selectedAddress
    );
    return {
        signer,
        provider,
        web3Provider
    }
}

function App() {
    const [count, setCount] = useState(0);
    const [countChanged, setCountChanged] = useState(false);

    async function loadSignerContract() {
        const { signer } = await loadWeb3();
        // Create a new ethers.js instance
        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
        return contract;
    }

    async function loadProvierContract() {
        const { provider } = await loadWeb3();
        // Create a new ethers.js instance
        const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);
        return contract;
    }

    const increment = async () => {
        const contract = await loadSignerContract();
        if (contract) {
            await contract.increment();
            const count = await contract.getCount();
            console.log(`Count: ${count}`);
            setCount(count.toString());
        }
    };

    const decrement = async () => {
        const contract = await loadSignerContract();
        if (contract) {
            await contract.decrement();
            const count = await contract.getCount();
            console.log(`Count: ${count}`);
            setCount(count.toString());
        }
    };

    const loadCount = async () => {
        const contract = await loadProvierContract();
        if (contract) {
            const count = await contract.getCount();
            console.log(`Count: ${count}`);
            setCount(count.toString());
        }
    };


    useEffect(() => {
        loadCount();
    }, []);

    useEffect(() => {
        if (!countChanged)
            setCountChanged(true);
    }, [count]);

    useEffect(() => {
        if (countChanged) {
            setTimeout(() => setCountChanged(false), 500); // Reset after 500ms
        }
    }, [countChanged]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div>
                    <div className="text-xl font-medium text-black overflow-clip h-10 display: flex flex-row flex-wrap items-stretch">
                        <span>
                            Counter:
                        </span>
                        <span
                            className={` font-medium text-black ${countChanged ?
                                'text-green-500 transition-all ease-in-out text-2xl'
                                :
                                'text-xl'}`}
                        >
                            {count}
                        </span>
                    </div>
                    <p className="text-gray-500">You can increment or decrement the counter using the buttons below.</p>
                    <div className="flex flex-row flex-wrap items-stretch mt-4 px-auto">
                        <button onClick={increment} className="mr-2 py-2 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-400">Increment</button>
                        <button onClick={decrement} className="py-2 px-4 bg-red-500 text-white text-sm rounded hover:bg-red-400">Decrement</button>
                    </div>
                    <div className="flex flex-row flex-wrap items-stretch mt-4 px-auto">
                        <button onClick={loadCount} className="py-2 px-4 bg-green-500 text-white text-sm rounded hover:bg-green-400">Force Load Count</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App
