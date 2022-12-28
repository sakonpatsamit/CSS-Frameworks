import { API_SOCIAL_POST, POST_PARAM } from "./constants.mjs"
import { posts as fetchedPosts, posts, sortList } from "./utils.mjs";

const token = localStorage.getItem("token");
const postContainer = document.querySelector("#post-container");

export function displayMultiPosts(posts) {
    postContainer.innerHTML ="";

 posts.forEach(function (getPosts) {
    postContainer.innerHTML += `<div class="card my-3">
    <div class="col-6 d-flex px-3 py-3">
      <div class="col d-flex align-items-center m-3">
        <h3>${getPosts.title}</h3>
      </div>
    </div>
    <p class="text-center ps-5">${getPosts.body}</p>
  </div>`
 })
}



let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const sortForm = document.querySelector("#sortDate");
const sortBtn = document.getElementsByName("sortBy");

let shouldSort = false;
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
} )

fetch(`${API_SOCIAL_POST}${POST_PARAM}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
    console.log(result);
    let renderList;
    if (shouldSort) {
        renderList = sortList(result)
    } else {
        renderList = result;
    }
    displayMultiPosts(renderList);
  })
  .catch(error => console.log('error', error));

{/* <div class="card my-3">
          <div class="col-6 d-flex px-3 py-3">
            <img
              class="profile-img rounded-circle mt-3 ms-2"
              src="/images/charlesdeluvio-Mv9hjnEUHR4-unsplash.jpg"
            />
            <div class="col d-flex align-items-center m-3">
              <h3>Sasuke235</h3>
            </div>
          </div>
          <p class="text-center ps-5">My gf broke up..</p>
          <div class="col d-flex justify-content-end my-3">
            <button class="btn mx-3 btn-secondary btn-sm">Like</button>
            <button class="btn btn-secondary me-2 btn-sm">Comment</button>
          </div>
        </div> */}

