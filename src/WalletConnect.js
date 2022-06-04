import WalletConnectProvider from "@walletconnect/web3-provider";
    import { providers } from "ethers";

const WalletConnect = async()=>{
    const provider = new WalletConnectProvider({
        infuraId: "a20f1d0ef34d4f5c84a1d8cead42c105",
    });
    try {
        await provider.enable();
        const web3Provider = new providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        return signer;
    } catch (error) {
        console.log(error);   
    }
    return -1;
}
export default WalletConnect;