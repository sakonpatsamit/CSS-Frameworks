import { API_AUTH_LOGIN } from "./constants.mjs";

const token = localStorage.getItem("token");
const userName = localStorage.getItem("username");
export let posts = [];

const logoutBtn = document.querySelector("#logout-btn");
if (token) {
    logoutBtn.innerHTML = `<button id="logout" class="btn btn-danger">Logout</button>`;
   
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        document.location = "./index.html";
    } )

}


export function loginHandler(loginEmail, loginPassword) {
    const myHeaders = new Headers();
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
      .then((response) => response.json())
      .then((result) => {
      if (result.accessToken == undefined) {
        alert(result.errors.message);
        return;
      }
      const token = result.accessToken;
      const userName = result.name
      localStorage.setItem("token", token);
      localStorage.setItem("username", userName);
      console.log(token, userName);
      document.location = "./home.html";
      })
      .catch(error => console.log('error', error));
    }
    
    export function sortList(list) {
      return [...list]
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .reverse();
    }