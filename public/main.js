"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var web3_1 = __importDefault(require("web3"));
//import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js';
var web3js;
function initweb3() {
    if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
        //if (typeof web3 !== 'undefined') {
        // Use injected web3
        web3js = new web3_1["default"](window.web3.currentProvider);
    }
    else {
        /* Fallback to local node or remote node
        by default local HTTP-RPC server exposes port 8545.
        you can use Infura Node Urls also
        'https://ropsten.infura.io/<API KEy>'*/
        web3js = new web3_1["default"](new web3_1["default"].providers.HttpProvider('http://127.0.0.1:8545'));
    }
}
// You should initialize web3 instance after window load event has fired to avoid any race condition.               
function createRipple(event) {
    var button = event.currentTarget;
    var circle = document.createElement("span");
    var diameter = Math.max(button.clientWidth, button.clientHeight);
    var radius = diameter / 2;
    circle.style.width = circle.style.height = diameter + "px";
    circle.style.left = event.clientX - (button.offsetLeft + radius) + "px";
    circle.style.top = event.clientY - (button.offsetTop + radius) + "px";
    circle.classList.add("submit-btn-ripple");
    var ripple = button.getElementsByClassName("submit-btn-ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
}
function addFormRow(ev) {
    var form = document.getElementById("page-form");
    var row = document.querySelectorAll(".form-row")[-1];
    var button = ev.currentTarget;
    var new_row = document.createElement("div");
    new_row.classList.add("form-row");
    var inputs = "<input type=\"text\" name=\"address\" id=\"address\" class=\"address-input\" placeholder=\"Address\">\n    <input type=\"number\" name=\"amount\" id=\"amount\" class=\"amount-input\" placeholder=\"Amount\">";
    new_row.insertAdjacentHTML("afterbegin", inputs);
    //row.insertAdjacentElement("afterend", new_row);
    button.insertAdjacentElement("beforebegin", new_row);
}
document.querySelector(".new-field-button").addEventListener("click", function (ev) {
    //createRipple(ev);
    addFormRow(ev);
});
document.getElementById("page-form").addEventListener("submit", function (ev) {
    createRipple(ev);
});
window.addEventListener('load', initweb3);
