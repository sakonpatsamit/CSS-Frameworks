import {
  API_AUTH_LOGIN,
  API_BASE,
  API_HOST_URL,
  API_POST,
  API_SOCIAL_POST,
  API_SOCIAL_URL,
} from "./constants.mjs";
const postContainer = document.querySelector("#post-container");

const token = localStorage.getItem("token");
const userName = localStorage.getItem("username");
export let posts = [];

export const sortPost = (newPosts) => {
  posts = newPosts;
};

const logoutBtn = document.querySelector("#logout-btn");
if (token) {
  if (logoutBtn) {
    logoutBtn.innerHTML = `<button id="logout" class="btn btn-danger">Logout</button>`;

    const logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      document.location = "./index.html";
    });
  }
}

export function loginHandler(loginEmail, loginPassword) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: loginEmail,
    password: loginPassword,
  });

  const requestOptions = {
    method: "POST",
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

      const { accessToken, name, ...profile } = result;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("username", name);
      console.log(accessToken, name);
      document.location = "./home.html";
    })
    .catch((error) => console.log("error", error));
}

export function sortList(list) {
  return [...list]
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .reverse();
}
