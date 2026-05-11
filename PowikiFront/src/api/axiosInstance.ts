import axios from "axios";

// 1. 환경변수에서 호스트 읽기
const RAW_HOST = import.meta.env.VITE_API_URL || "";
const HOST = RAW_HOST.replace(/\/+$/, ""); 

// 2. baseURL
const BASE_URL = HOST + "/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default api;