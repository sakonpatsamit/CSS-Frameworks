import { API_AUTH_LOGIN } from "./constants.mjs";


export function loginHandler(loginEmail, loginPassword) {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  email: loginEmail,
  password: loginPassword
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
 
};

fetch(`${API_AUTH_LOGIN}`, requestOptions)
  .then(response => response.json())
  .then(result => {
  if (result.accessToken == undefined) {
    alert(result.errors.message);
    return;
  }
  const token = result.accessToken;
  const userName = result.name
  localStorage.setItem("token", accessId);
  localStorage.setItem("username", userName);
  document.location = "./home.html";
  })
  .catch(error => console.log('error', error));
}

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

