import axios from "axios";
import { baseUrl } from "utilities/Config";
import { getUserToken, setAuthToken } from "utilities/user";

export function login(payload) {
  return axios.post(`${baseUrl}users/login`, payload);
}

export function createUser(payload) {
  const token = getUserToken();
  setAuthToken(token);
  return axios.post(`${baseUrl}users`, payload);
}

export function updateUserService(id, payload) {
  const token = getUserToken();
  setAuthToken(token);
  return axios.put(`${baseUrl}users/${id}`, payload);
}

export function createCustomer(payload) {
  const token = getUserToken();
  setAuthToken(token);
  return axios.post(`${baseUrl}customers`, payload);
}

export function updateCustomerService(id, payload) {
  const token = getUserToken();
  setAuthToken(token);
  return axios.put(`${baseUrl}customers/${id}`, payload);
}

export function createParcel(payload) {
  const token = getUserToken();
  setAuthToken(token);
  return axios.post(`${baseUrl}parcels`, payload);
}

export function updateParcelService(id, payload) {
  const token = getUserToken();
  setAuthToken(token);
  return axios.put(`${baseUrl}parcels/${id}`, payload);
}
