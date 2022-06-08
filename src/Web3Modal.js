require("./css/index.css");
import MetamaskConnect from "./MetamaskConnect";
import WalletConnect from "./WalletConnect";
import PayWithETH from "./PayWithETH";
import PayWithToken from "./PayWithToken";

const Web3Button = ()=>{
    var web3Button = document.getElementById('Web3Button');
    var Button = document.createElement('button');
    Button.setAttribute('class', "Web3Button")
    Button.innerHTML = "Web3Button";
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
    console.log("Pay");
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

    var coin = document.createElement('button');
    coin.setAttribute('class', "Web3Button");
    price.innerHTML = '0.001';
    symbol.innerHTML = 'ETH';
    coin.appendChild(symbol);
    coin.appendChild(price);
    coin.addEventListener('click', async()=>{
        console.log("ETH");
    })
    

    
    ModalContent.appendChild(head);
    ModalContent.appendChild(hr);
    ModalContent.appendChild(coin);
    
    Modal.appendChild(ModalContent);

    window.addEventListener('click', (event)=>{
        if (event.target == Modal) {
            document.body.removeChild(Modal);
        }
    });

}

export default Web3Button;