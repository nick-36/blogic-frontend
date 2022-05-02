import axios from "axios";

const BASE_URL = process.env.REACT_APP_PROD_SERVER_URL;

const currentUser = JSON.parse(localStorage.getItem("user"));
const TOKEN = currentUser?.accessToken;

export const userRequest = axios.create({
  baseURL: BASE_URL,

  headers: { token: `Bearer ${TOKEN}` },
});
