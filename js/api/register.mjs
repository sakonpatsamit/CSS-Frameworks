import { API_REGISTER_URL } from "./constants.mjs";
import { loginHandler } from "./utils.mjs";

function registerUser(event) {
  event.preventDefault();
  const emailPattern = /^([a-zA-Z0-9]+@(noroff.no|stud.noroff.no))$/;
  const newUser = document.querySelector("#userName").value;
  const newEmail = document.querySelector("#userEmail").value;
  const newPassword = document.querySelector("#userPassword").value;

  if (!emailPattern.test(newEmail)) {
    alert("Please enter an email with either .noroff or stud.noroff.no");
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: newUser,
    email: newEmail,
    password: newPassword,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch(`${API_REGISTER_URL}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.message) {
        alert(result.message);
        return;
      }
      const { email } = result;
      loginHandler(email, newPassword);
    })
    .catch((error) => console.log("error", error));
}

const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}
