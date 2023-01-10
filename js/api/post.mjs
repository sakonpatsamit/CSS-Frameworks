import { editPost, deletePost, getPostById } from "./api.mjs";
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("post");

const postContainer = document.querySelector("#singlePost");
const authorToolsContainer = document.querySelector("#author-tools");
const alertContainer = document.querySelector("#alert");

let post = null;

function renderPost() {

  if (!postId) {
    showAlert("Something went wrong", "We couldn't find the post you're looking for. Please try again.", "danger");
    return;
  }

  getPostById(postId).then((result) => {
    if (result && result.id) {
      post = result;
      displaySinglePost(result);
      displayAuthorTools(result);
    } else {
      if (result.statusCode == 404) {
        showAlert("Something went wrong", "The post you're looking for no longer exists. Please return to the previous page.", "danger");
      }
    }
  });
}

renderPost();


function displaySinglePost(post) {
  if (post.title) {
    postContainer.innerHTML = `<div>
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

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  authorToolsContainer.appendChild(editBtn);
  authorToolsContainer.appendChild(deleteBtn);

  editBtn.addEventListener("click", showEdit);

  deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();

    deletePost(post.id).then((wasDeleted) => {
      if (wasDeleted) {
        postContainer.innerHTML = "";
        authorToolsContainer.innerHTML = "";
        showAlert(
          "Success",
          `The post was successfully deleted. Click <a href="./home.html">here</a> to return to the homepage.`
        );
      }
    });
  });
}

function showEdit(event) {
  console.log(event);
  authorToolsContainer.innerHTML += `
  <form>
    <input type="text">
    <textarea></textarea>
  </form>
  `;

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Save changes";
  authorToolsContainer.appendChild(submitBtn);

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const input = document.querySelector("input");
    const textarea = document.querySelector("textarea");

    const inputValue = input.value;
    const textareaValue = textarea.value;

    editPost(postId, inputValue, textareaValue).then((result) => {
      if (result) {
        authorToolsContainer.innerHTML = "";
        showAlert(
          "Success",
          `The post was successfully edited. Click <a href="./home.html">here</a> to return to the homepage.`,
          "success"
        );
        renderPost();
      } else {
        showAlert(
          "Failed",
          `The post couldn't be edited`,
          "danger"
        );
      }
    });
  });
}

function showAlert(title, content, type = "info") {
  alertContainer.innerHTML = `<div class="alert alert-${type}"><h4>${title}</h4><p>${content}</p></div>`;
}
