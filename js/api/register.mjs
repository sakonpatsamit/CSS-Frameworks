
import { API_REGISTER_URL } from "./constants.mjs";

function registerUser(event) {
    event.preventDefault();
    const newUser = document.querySelector("#userName").value
    const newEmail = document.querySelector("#userEmail").value
    const newPassword = document.querySelector("#userPassword").value

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  name: newUser,
  email: newEmail,
  password: newPassword
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};

fetch(`${API_REGISTER_URL}`, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
} 

const registerForm = document.querySelector("#registerForm")
if (registerForm) {
    registerForm.addEventListener("submit", registerUser)
    console.log(registerUser)
} 

    