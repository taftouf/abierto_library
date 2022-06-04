import { ethers } from "ethers";

const PayWithETH = async(_to, _amount)=>{
    if(_amount !== undefined && _to !== undefined){
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let abi = ["function PayWithETH(address _to)external payable"]
            let contract = new ethers.Contract("0x82703A9F3618Dce7CE840f45704eD0160066A3B4", abi, signer);
            let overrides = {
                value: ethers.utils.parseUnits(_amount.toString(),"ether"),
            };
            let tx = await contract.PayWithETH(_to.toString(), overrides);
            let res = await tx.wait();
            return {
                status: res.status,
                msg: res
            }
        } catch (error) {
            if(error.code === undefined){
                return {
                    status:-1,
                    msg: error
                }
            }else{
                return {
                    status:error.code,
                    msg: error.message
                }
            }
        }
    }else{
        return {
            status:-1,
            msg: "receiver Or amount is undefined"
        }
    }
}

export default PayWithETH;
