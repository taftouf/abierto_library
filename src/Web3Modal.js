require("./css/index.css");
import MetamaskConnect from "./MetamaskConnect";
import WalletConnect from "./WalletConnect";
import PayWithETH from "./PayWithETH";
import PayWithToken from "./PayWithToken";
import { ethers } from "ethers";


var receiver = null;
var amount = null;
var nbrCoins = 0;
var Loading = null;
const Web3Button = ()=>{
    const web3Button = document.getElementById('Web3Button');
    var Button = document.createElement('button');
    Button.setAttribute('class', "Web3Button")
    Button.innerHTML = "Pay With Crypto";
    Button.addEventListener('click', async()=>{
        await Web3Modal();
    });
    web3Button.appendChild(Button);
}

const Web3Modal = async()=>{
    // create modal
    var Modal = document.createElement('div');
    Modal.setAttribute('class', "Web3Modal");
    document.body.appendChild(Modal);

    var ModalContent = document.createElement('div');
    ModalContent.setAttribute('class', "Web3ModalContent");
    

    var head = document.createElement('div');

    var close = document.createElement('button');
    close.setAttribute('class', "close");
    close.innerHTML = "&times;";
    close.addEventListener('click', ()=>{
        document.body.removeChild(Modal);
    })

    var title = document.createElement('span');
    title.setAttribute('class', "Web3Title");
    title.innerHTML = "Connect Wallet";

    head.appendChild(title);
    head.appendChild(close);

    var hr = document.createElement("hr");
    hr.setAttribute('class', "Web3hr");


    var Metamask = document.createElement('button');
    Metamask.setAttribute('class', "Web3Button")
    Metamask.innerHTML = "Metamask";
    Metamask.addEventListener('click', async()=>{
        
        const res = await MetamaskConnect();
        if (res.signer) {
            document.body.removeChild(Modal);
            getMetadata()
            Pay();
        }else{
            console.log(res.error);
        }
    })

    var walletConnect = document.createElement('button');
    walletConnect.setAttribute('class', "Web3Button");
    walletConnect.innerHTML = "WalletConnect";
    walletConnect.addEventListener('click', async()=>{
        const res = await WalletConnect();
        if (res.signer) {
            document.body.removeChild(Modal);
            getMetadata()
            Pay();
        }else{
            console.log(res.error);
        }
    })
    
    ModalContent.appendChild(head);
    ModalContent.appendChild(hr);
    ModalContent.appendChild(Metamask);
    ModalContent.appendChild(walletConnect);
    
    
    Modal.appendChild(ModalContent);

    window.addEventListener('click', (event)=>{
        if (event.target == Modal) {
            document.body.removeChild(Modal);
        }
    });
}


const Pay = ()=>{
    const web3Button = document.getElementById('Web3Button');
    var Modal = document.createElement('div');
    Modal.setAttribute('class', "Web3Modal");
    document.body.appendChild(Modal);

    var ModalContent = document.createElement('div');
    ModalContent.setAttribute('class', "Web3ModalContent");
    

    var head = document.createElement('div');

    var close = document.createElement('button');
    close.setAttribute('class', "close");
    close.innerHTML = "&times;";
    close.addEventListener('click', ()=>{
        document.body.removeChild(Modal);
    })

    var title = document.createElement('span');
    title.setAttribute('class', "Web3Title");
    title.innerHTML = "Pay With Crypto";

    head.appendChild(title);
    head.appendChild(close);

    var hr = document.createElement("hr");
    hr.setAttribute('class', "Web3hr");

    var price = document.createElement("span");
    price.setAttribute("class", "price_span");

    var symbol = document.createElement("span");
    symbol.setAttribute("class", "symbol_span");

    var Eth = document.createElement('button');
    Eth.setAttribute('class', "Web3Button");
    price.innerHTML = '0.001';
    symbol.innerHTML = "Eth";
    Eth.appendChild(symbol);
    Eth.appendChild(price);
    Eth.addEventListener('click', async()=>{
        document.body.removeChild(Modal);
        StartLoading();
        let res = await PayWithETH(receiver, amount);
        document.body.removeChild(Loading);
        if(res.status === 1){
            showModalSuccess();
        }else{
            showModalFailed(res);
        }
    })
    const listToken = [];
    for (let index = 0; index < nbrCoins; index++) {
        var price = document.createElement("span");
        price.setAttribute("class", "price_span");

        var symbol = document.createElement("span");
        symbol.setAttribute("class", "symbol_span");

        var coin = document.createElement('button');
        coin.setAttribute('class', "Web3Button");       
        price.innerHTML = web3Button.getAttribute("data-token"+index+"-price");
        symbol.innerHTML = web3Button.getAttribute("data-token"+index+"-symbol");
        coin.appendChild(symbol);
        coin.appendChild(price);
        coin.addEventListener('click', async()=>{
            try {
                var _token = web3Button.getAttribute("data-token"+index+"-address");
                var _price = web3Button.getAttribute("data-token"+index+"-price");
                var _decimal = web3Button.getAttribute("data-token"+index+"-decimal");
                document.body.removeChild(Modal);
                StartLoading();
                var res = null;
                if(_decimal == String(18)){
                    res = await PayWithToken(receiver, _token, ethers.utils.parseEther(_price));
                }else{
                    _price = parseInt(_price) * 10 ** parseInt(_decimal);
                    res = await PayWithToken(receiver, _token, String(_price));
                }
                document.body.removeChild(Loading);
                if(res.status === 1){
                    showModalSuccess();
                }else{
                    showModalFailed(res);
                }

            } catch (error) {
                console.log(error);
            }
        })
        listToken[index] = coin;
    }

    ModalContent.appendChild(head);
    ModalContent.appendChild(hr);
    ModalContent.appendChild(Eth);
    for (let index = 0; index < listToken.length; index++) {
        ModalContent.appendChild(listToken[index]);
    }


    Modal.appendChild(ModalContent);

    window.addEventListener('click', (event)=>{
        if (event.target == Modal) {
            document.body.removeChild(Modal);
        }
    });

}

const getMetadata = ()=>{
    const web3Button = document.getElementById('Web3Button');
    receiver = web3Button.dataset.receiver;
    amount = web3Button.dataset.amount;
    nbrCoins = web3Button.dataset.tokenNumber;
}


const StartLoading = ()=>{
    const web3Button = document.getElementById('Web3Button');
    Loading = document.createElement('div');
    Loading.setAttribute('class', "Web3Modal");
    document.body.appendChild(Loading);

    var ModalContent = document.createElement('div');
    ModalContent.setAttribute('class', "Web3ModalContent");
    

    var head = document.createElement('div');

    var title = document.createElement('span');
    title.setAttribute('class', "Web3Title");
    title.innerHTML = "Please wait your payment is being processed";

    head.appendChild(title);

    var hr = document.createElement("hr");
    hr.setAttribute('class', "Web3hr");

    var load = document.createElement('div');
    load.setAttribute('class', "load");
    var loading = document.createElement('div');
    loading.setAttribute('class', "lds-dual-ring");
    load.appendChild(loading)
    

    ModalContent.appendChild(head);
    ModalContent.appendChild(hr);
    ModalContent.appendChild(load);
    Loading.appendChild(ModalContent);
}

const showModalSuccess = ()=>{

    const web3Button = document.getElementById('Web3Button');
    var Modal = document.createElement('div');
    Modal.setAttribute('class', "Web3Modal");
    document.body.appendChild(Modal);

    var ModalContent = document.createElement('div');
    ModalContent.setAttribute('class', "Web3ModalContent");
    

    var head = document.createElement('div');

    var close = document.createElement('button');
    close.setAttribute('class', "close");
    close.innerHTML = "&times;";
    close.addEventListener('click', ()=>{
        document.body.removeChild(Modal);
    })

    var title = document.createElement('span');
    title.setAttribute('class', "Web3Title");
    title.innerHTML = "Your payment has been processed successfully";

    head.appendChild(title);
    head.appendChild(close);

    var hr = document.createElement("hr");
    hr.setAttribute('class', "Web3hr");

    var showModal = document.createElement('div');
    showModal.setAttribute('class', "showModal");
    var success = document.createElement('spam');
    success.innerHTML = 'success';
    
    showModal.appendChild(success);
    ModalContent.appendChild(head);
    ModalContent.appendChild(hr);
    ModalContent.appendChild(showModal);
   
    Modal.appendChild(ModalContent);

    window.addEventListener('click', (event)=>{
        if (event.target == Modal) {
            document.body.removeChild(Modal);
        }
    });
}

const showModalFailed = (res)=>{
    

    const web3Button = document.getElementById('Web3Button');
    var Modal = document.createElement('div');
    Modal.setAttribute('class', "Web3Modal");
    document.body.appendChild(Modal);

    var ModalContent = document.createElement('div');
    ModalContent.setAttribute('class', "Web3ModalContent");
    

    var head = document.createElement('div');

    var close = document.createElement('button');
    close.setAttribute('class', "close");
    close.innerHTML = "&times;";
    close.addEventListener('click', ()=>{
        document.body.removeChild(Modal);
    })

    var title = document.createElement('span');
    title.setAttribute('class', "Web3Title");
    title.innerHTML = " Transaction Failed ";

    head.appendChild(title);
    head.appendChild(close);

    var hr = document.createElement("hr");
    hr.setAttribute('class', "Web3hr");

    var showModal = document.createElement('div');
    showModal.setAttribute('class', "showModal")
    var failed = document.createElement('span');
    failed.innerHTML = res.msg;
    
    showModal.appendChild(failed);

    ModalContent.appendChild(head);
    ModalContent.appendChild(hr);
    ModalContent.appendChild(showModal);
   
    Modal.appendChild(ModalContent);

    window.addEventListener('click', (event)=>{
        if (event.target == Modal) {
            document.body.removeChild(Modal);
        }
    });
}
export default Web3Button;