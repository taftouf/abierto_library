import { ethers } from "ethers";

const MetamaskConnect = async ()=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return {signer:signer};
    } catch (error) {
        if (error.code) {
            return {signer:false, error:error.code};
        } else {
            return {signer:false, error: error};
        }
    }
}

export default MetamaskConnect;