import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://168.107.13.225:8080",
  timeout: 5000,
});

export default api;