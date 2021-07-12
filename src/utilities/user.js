import axios from "axios";
import jwtDecode from "jwt-decode";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

function getDecodedUser(token) {
  return jwtDecode(token);
}

function logoutUser() {
  localStorage.removeItem("_session");
  window.location.href = "/";
}

function getUserToken() {
  return localStorage.getItem("_session");
}

function setUserToken(token) {
  return localStorage.setItem("_session", token);
}

export { logoutUser, getUserToken, setUserToken, setAuthToken, getDecodedUser };
