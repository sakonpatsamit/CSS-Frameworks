import { getPostById } from "./api.mjs";

const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("post");

let post = null;

// Vise feilmelding om postId ikke finnes

// Get single post
function renderPost() {
  getPostById(postId).then((result) => {
    if (result) {
      post = result;
      displaySinglePost(result);
      displayAuthorTools(result);
    } else {
      // Vise feilmelding om vi ikke få´r en post
    }
  });
}

renderPost();

// Display single post on page
function displaySinglePost(post) {
  if (post.title) {
    document.querySelector("#singlePost").innerHTML = `<div>
      <div> <h2>${post.author.name}</h2> </div>
      <div> <h3>${post.title}</h3> </div>
      <div> <p>${post.body} </p> </div>
      `;
  }
}

function displayAuthorTools(post) {
  const currentUser = localStorage.getItem("username");

  console.log(post);
  if (post.author.name != currentUser) return;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  document.querySelector("#singlePost").parentElement.appendChild(editBtn);

  editBtn.addEventListener("click", showEdit);
}

function showEdit(event) {
    console.log(event);
  document.querySelector("#singlePost").innerHTML += `
  <form>
    <input type="text">
    <textarea></textarea>
  </form>
  `;

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Save changes";
  document.querySelector("#singlePost").appendChild(submitBtn);
}

// Submit knapp for editen
// Send editPost() med id til posten du redigerer og endret tittel og tekst
// Hvis du gjør det på´hjemmesiden må´du kalle renderPosts() på´nytt.
// Hvis du gjør det på´post siden må´du kalle renderPost() på´nytt.

// editPost(2041, "hey", "Ho").then(res => {
//   console.log(res);
// });
