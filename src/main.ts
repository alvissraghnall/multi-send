import Web3jx from "web3";
import type { Contract } from "web3-eth-contract";
//import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js';
declare const Web3: any;
const INFURA_URL = "https://ropsten.infura.io/v3/41b5820f64494703ba60ec7baf7eb02c";
import { ABI } from "./abi";

let web3js: Web3jx;
let contract: Contract;
let Multisend;
let acct: string;

function initweb3() {

  //  if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
  //  //if (typeof web3 !== 'undefined') {
  //   // Use injected web3
  //   web3js = new Web3(window.web3.currentProvider);
  // } else {
  //   /* Fallback to local node or remote node               
  //   by default local HTTP-RPC server exposes port 8545.
  //   you can use Infura Node Urls also
  //   'https://ropsten.infura.io/<API KEy>'*/
  //   web3js = new Web3(new Web3.providers.HttpProvider('https://aurora-testnet.infura.io/v3/41b5820f64494703ba60ec7baf7eb02c'));
  // }
  web3js = new Web3(Web3.givenProvider || "ws://localhost:8545");
  
  getContract();

  (window as any).ethereum?.enable();

}

const getContract = async () => {
  
  acct = web3js.eth.defaultAccount = (await web3js.eth.getAccounts())[0];
  const netId = await web3js.eth.net.getId();
  // const deployedNet = ABI.networks[netId];
  // web3js.eth.personal.unlockAccount(acct, "", 5000);
  console.log(await web3js.eth.getBalance(acct));

  contract = new web3js.eth.Contract(ABI, "0xacF8a727309b97A0354398D96985da05C8354753");
  // Multisend = contract.deploy({})
  // 0xacF8a727309b97A0354398D96985da05C8354753
  console.log(web3js.eth.defaultAccount, contract, contract.methods);
}

function sendFunds () {
  const addresses = formFields.map(field => field.address);
  const amounts = formFields.map(field => field.amount);

  console.log(addresses, amounts);

  try {
    contract.methods.sendAll(addresses, amounts).send({
      gas: 40000,
      from: acct
    });
    
  } catch (error: any) {
    // const err =  error as Error;
    const modal = document.querySelector(".modal") as HTMLDivElement;
    const exit = document.querySelector(".modal-close");
    const modalContentEl = document.querySelector(".modal-content") as HTMLParagraphElement;

    modalContentEl.innerText = error.message;

    if(error.code === "INVALID_ARGUMENT") {
      modalContentEl.innerText = "You entered an invalid Ethereum address. Check and try again!"
    }

    modal.classList.add("open");
    exit?.addEventListener("click", ev => {
      ev.preventDefault();
      modal.classList.remove("open");
    })

    setTimeout(() => {
      modal.classList.remove("open");
    }, 4900);

    console.log(error, error.message);
  }

  
}

let formFields: {
  address: string,
  amount: number
}[] = [];

const setupFields = () => {
  const addresses = document.getElementsByName("address");
  const amounts = document.getElementsByName("amount");

  for(let i = 0; i < addresses.length; i++) {
    const address = addresses[i] as HTMLInputElement;
    const amount = amounts[i] as HTMLInputElement;
    formFields.push({
      address: address.value.trimStart(),
      amount: Number(amount.value)
    });
  }

  console.log(formFields);
}

// function setupFields (ev: FormEvent) {
//   const formData = new FormData(ev.target);

//   const fd = [...formData];
//   console.log(fd)
//   let fields: {
//     address: string,
//     amount: number
//   }[] = [];
//   let currAddress: string;
//   let currAmt: number;
//   for (let i = 0; i < fd.length; i + 2) {
//     console.log(fd[i])
//     currAddress = fd[i][1];
//     currAmt = fd[i+1][1];
    
//     fields.push({
//       address: currAddress,
//       amount: currAmt
//     });
//   }
//   console.log(fields);
// }

// You should initialize web3 instance after window load event has fired to avoid any race condition.               

function createRipple(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${(event as MouseEvent).clientX - (button.offsetLeft + radius)}px`;
  circle.style.top = `${(<MouseEvent>event).clientY - (button.offsetTop + radius)}px`;
  circle.classList.add("submit-btn-ripple");

  const ripple = button.getElementsByClassName("submit-btn-ripple")[0] !;

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

function addFormRow(ev: Event) {
  const form = document.getElementById("page-form") !;
  const row = document.querySelectorAll(".form-row") ![-1];
  const button = <HTMLButtonElement> ev.currentTarget;
    
    const new_row = document.createElement("div");
    new_row.classList.add("form-row");
    const inputs = `<input type="text" name="address" id="address" class="address-input" placeholder="Address">
      <input type="number" name="amount" id="amount" class="amount-input" placeholder="Amount">`;
      
    new_row.insertAdjacentHTML("afterbegin", inputs);
    
    //row.insertAdjacentElement("afterend", new_row);
    
    button.insertAdjacentElement("beforebegin", new_row);
  }
  
  document.querySelector(".new-field-button")!.addEventListener("click", (ev: Event) => {
    //createRipple(ev);
    addFormRow(ev);
  });
  
  document.getElementById("page-form")!.addEventListener("submit", (ev: Event) => {
    ev.preventDefault();
    createRipple(ev);
    //console.log(ev);
    setupFields();
    sendFunds();

    formFields = [];
  });
  
  window.addEventListener('load', initweb3);  
  
