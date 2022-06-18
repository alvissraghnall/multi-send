(function () {
    'use strict';

    function initweb3() {
        if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
            new Web3(window.web3.currentProvider);
        }
        else {
            new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
        }
    }
    function createRipple(event) {
        var button = event.currentTarget;
        var circle = document.createElement("span");
        var diameter = Math.max(button.clientWidth, button.clientHeight);
        var radius = diameter / 2;
        circle.style.width = circle.style.height = "".concat(diameter, "px");
        circle.style.left = "".concat(event.clientX - (button.offsetLeft + radius), "px");
        circle.style.top = "".concat(event.clientY - (button.offsetTop + radius), "px");
        circle.classList.add("submit-btn-ripple");
        var ripple = button.getElementsByClassName("submit-btn-ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);
    }
    function addFormRow(ev) {
        document.getElementById("page-form");
        document.querySelectorAll(".form-row")[-1];
        var button = ev.currentTarget;
        var new_row = document.createElement("div");
        new_row.classList.add("form-row");
        var inputs = "<input type=\"text\" name=\"address\" id=\"address\" class=\"address-input\" placeholder=\"Address\">\n      <input type=\"number\" name=\"amount\" id=\"amount\" class=\"amount-input\" placeholder=\"Amount\">";
        new_row.insertAdjacentHTML("afterbegin", inputs);
        button.insertAdjacentElement("beforebegin", new_row);
    }
    document.querySelector(".new-field-button").addEventListener("click", function (ev) {
        addFormRow(ev);
    });
    document.getElementById("page-form").addEventListener("submit", function (ev) {
        ev.preventDefault();
        createRipple(ev);
    });
    window.addEventListener('load', initweb3);

})();
