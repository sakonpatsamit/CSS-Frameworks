import { getPosts, createPost } from "./api.mjs";
import { posts as fetchedPosts, sortList, sortPost } from "./utils.mjs";

let shouldSort = false;
let posts = [];

const userId = localStorage.getItem("username") || "Unknown";

// Post list
const postContainer = document.querySelector("#post-container");
// User
const nameContainer = document.querySelector("#userId");
// Sorting / Filtering
const sortForm = document.querySelector("#sortDate");
const sortBtn = document.getElementsByName("sortBy");
const searchForm = document.querySelector("#searchForm");
// New Post
const createPostBtn = document.querySelector("#createPostBtn");
const postName = document.querySelector("#post-title");
const postBody = document.querySelector("#post");

// Display username
nameContainer.innerHTML = `${userId}`;

// Get all posts
function renderPosts() {
  getPosts().then((result) => {
    sortPost(result);

    if (shouldSort) {
      posts = sortList(result);
      console.log(sortList);
    } else {
      posts = result;
    }

    displayMultiPosts(posts);
  });
}

renderPosts();

export function displayMultiPosts(posts) {
  postContainer.innerHTML = "";

  posts.forEach((getPosts) => {
    postContainer.innerHTML += `<div>
    <div>
      <h2>${getPosts.author.name}</h2>
      <div>
        <a href="/spesificpost.html?post=${getPosts.id}"><h3>${getPosts.title}</h3></a> 
      </div>
    </div>
    <p>${getPosts.body}</p>
  </div>`;
  });
}

export function searchEvent(event) {
  event.preventDefault();

  const searchInput = document.querySelector("#searchBar").value.toLowerCase();
  const postFound = posts.filter(
    (searchPost) =>
      searchPost.title.toLowerCase().includes(searchInput) ||
      searchPost.body.toLowerCase().includes(searchInput) ||
      searchPost.author.name.toLowerCase().includes(searchInput)
  );

  postContainer.innerHTML = "";
  displayMultiPosts(postFound);
}

sortForm.addEventListener("submit", (click) => {
  click.preventDefault();
  let posts = fetchedPosts;
  let renderList;
  if (!sortBtn[0].checked) {
    renderList = sortList(posts);
  } else {
    renderList = posts;
  }
  postContainer.innerHTML = "";
  displayMultiPosts(renderList);
});

searchForm.addEventListener("submit", searchEvent);

createPostBtn.addEventListener("click", () => {
  const postContent = postBody.value;
  const postTitle = postName.value;

  if (postTitle.length > 3 && postContent.length > 3) {
    createPost(postTitle, postContent).then((res) => {
      console.log(res);
      renderPosts();
    });
  } else {
    alert("Your title and content must be at least 3 characters long");
  }
});
