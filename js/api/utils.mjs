import { API_AUTH_LOGIN } from "./constants.mjs";
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
    