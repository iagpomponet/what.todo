import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
});

export default api;