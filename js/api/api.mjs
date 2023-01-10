import { API_SOCIAL_POST, POST_PARAM } from "./constants.mjs";

const token = localStorage.getItem("token");
let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

/**
 * Fetches the post API, turns the respons into a json object
 * @returns {boolean} returns false if the API call fails
 * @returns {Object} a JSON object with an array of posts
 */

export function getPosts() {
  return fetch(`${API_SOCIAL_POST}${POST_PARAM}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
}

export function getPostById(id) {
  return fetch(`${API_SOCIAL_POST}/${id}${POST_PARAM}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
}

export function createPost(_title, _content) {
  const postData = JSON.stringify({
    title: _title,
    body: _content,
    tags: [],
    media: "",
  });

  return fetch(API_SOCIAL_POST, {
    method: "POST",
    headers: myHeaders,
    body: postData,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return true;
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
}

export function editPost(_id, _title, _content) {
  const postData = JSON.stringify({
    title: _title,
    body: _content,
    tags: [],
    media: "",
  });

  return fetch(`${API_SOCIAL_POST}/${_id}`, {
    method: "PUT",
    headers: myHeaders,
    body: postData,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
}

export function deletePost(_id) {
  return fetch(`${API_SOCIAL_POST}/${_id}`, {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return true;
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
}
