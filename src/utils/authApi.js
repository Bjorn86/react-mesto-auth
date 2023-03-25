// VARIABLES
const BASE_AUTH_URL = "https://auth.nomoreparties.co";

// MAKE REQUEST TO THE SERVER
function makeRequest(url, method, body, token) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers };
  if (token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_AUTH_URL}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
}

// REGISTRATION USER
export function register({ password, email }) {
  return makeRequest("/signup", "POST", { password, email });
}

// AUTHORIZATION USER
export function authorize({ password, email }) {
  return makeRequest("/signin", "POST", { password, email });
}

// GET USER CONTENT FROM THE SERVER
export function getContent(token) {
  return makeRequest("/users/me", "GET", undefined, token);
}
