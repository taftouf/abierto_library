import { ethers } from "ethers";

const MetamaskConnect = async ()=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return signer;
    } catch (error) {
        if (error.code) {
            return error.code;
        } else {
            console.log(error);
        }
    }
    return -1;
}

export default MetamaskConnect;