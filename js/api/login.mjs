import { API_AUTH_LOGIN } from "./constants.mjs";
import { loginHandler } from "./utils.mjs";


export function loginInit(event) {
    event.preventDefault();
    const loginEmail = document.querySelector("#loginEmail").value.toLowerCase() 
    const loginPassword = document.querySelector("#loginPassword").value
    
    if (!loginEmail || !loginPassword) {
        alert("Please enter user email and password.");
        return;
    }
    loginHandler(loginEmail, loginPassword);
}

function loginForm () {
 const loginBtn = document.querySelector("#loginForm");
 if (loginBtn) {
  loginBtn.addEventListener("submit", loginInit);
 } 
}

loginForm();