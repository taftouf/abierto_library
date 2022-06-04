import { ethers } from "ethers";

const PayWithToken = async(_to, _token, _amount)=>{
    if(_amount !== undefined && _to !== undefined && _token !== undefined){
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let abi1 = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
            let contract_ERC20 = new ethers.Contract(_token.toString(), abi1, signer);
            let tx = await contract_ERC20.approve("0x82703A9F3618Dce7CE840f45704eD0160066A3B4", _amount);
            let res = await tx.wait();
            let overrides = {
                gasLimit: 750000,
            };
            let abi2 = ["function SwapTokenForETH(uint tokenAmount, address token, address to) external"];
            let contract = new ethers.Contract("0x82703A9F3618Dce7CE840f45704eD0160066A3B4",abi2,signer);
            tx = await contract.SwapTokenForETH(_amount.toString(),_token.toString(), _to.toString(), overrides);
            res = await tx.wait();
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
            msg: "Receiver Or Amount Or Token is undefined"
        }
    }
}

export default PayWithToken;