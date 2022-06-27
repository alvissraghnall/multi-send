//import Web3 from "web3";
//import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js';
declare const Web3: any;
import { ABI } from "./abi";

let web3js;
let Contract;
let Multisend;

function initweb3() {

  if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
    //if (typeof web3 !== 'undefined') {
    // Use injected web3
    web3js = new Web3(window.web3.currentProvider);
  } else {
    /* Fallback to local node or remote node               
    by default local HTTP-RPC server exposes port 8545.
    you can use Infura Node Urls also
    'https://ropsten.infura.io/<API KEy>'*/
    web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  }
  web3js.eth.defaultAccount = web3js.eth.accounts[0];
  const abi = 
  Contract = web3js.eth.contract(ABI);
  Multisend = Contract.at(/*CONTRACT ADDRESS*/);
       
  console.log(Multisend);
}

function sendFunds () {
  
}

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
  });
  
  window.addEventListener('load', initweb3);  
  
