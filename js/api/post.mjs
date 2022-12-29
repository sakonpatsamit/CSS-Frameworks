import { API_SOCIAL_POST, POST_PARAM } from "./constants.mjs"
import { posts as fetchedPosts, sortList, sortPost, searchEvent  } from "./utils.mjs";


const token = localStorage.getItem("token");
 const postContainer = document.querySelector("#post-container");

export function displayMultiPosts(posts) {
    postContainer.innerHTML ="";
    

 posts.forEach(function (getPosts) {
    postContainer.innerHTML += `<div>
    <div >
    <div> <h2>${getPosts.author.name}</h2>
      <div>
        <h3>${getPosts.title}</h3>
      </div>
    </div>
    <p>${getPosts.body}</p>
  </div>`
 })
}

const userId = localStorage.getItem("username");
const nameContainer = document.querySelector("#userId");

nameContainer.innerHTML = `${userId}`

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
    sortPost(result);
    let renderList;
    if (shouldSort) {
        renderList = sortList(result)
        console.log(sortList);
    } else {
        renderList = result;
        // console.log(renderList);
    }
    displayMultiPosts(renderList);
  })
  .catch(error => console.log('error', error));

  
const searchForm = document.querySelector("#searchForm");

if(searchForm) {
    searchForm.addEventListener("submit", searchEvent);
}
