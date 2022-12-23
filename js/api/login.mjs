import { API_AUTH_LOGIN } from "./constants.mjs";

function userLogin (event) {
event.preventDefault();
const loginEmail = document.querySelector("#loginEmail").value 
const loginPassword = document.querySelector("#loginPassword").value

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
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

