import { loginHandler } from "./utils.mjs";

/**
 *
 * @param {any} event event from an HTML element
 *
 */
export function loginInit(event) {
  event.preventDefault();

  const emailPattern = /^([a-zA-Z0-9]+@(noroff.no|stud.noroff.no))$/;

  const loginEmail = document.querySelector("#loginEmail").value.toLowerCase();
  const loginPassword = document.querySelector("#loginPassword").value;

  if (!loginEmail || !emailPattern.test(loginEmail) || !loginPassword) {
    alert(
      "Please enter an email with with .noroff or stud.noroff.no and password."
    );
    return;
  }
  loginHandler(loginEmail, loginPassword);
}

function loginForm() {
  const loginBtn = document.querySelector("#loginForm");
  if (loginBtn) {
    loginBtn.addEventListener("submit", loginInit);
  }
}

loginForm();
