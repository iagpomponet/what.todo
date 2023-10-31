import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
});

api.interceptors.response.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error

    console.log("aaa", error.response.status);

    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      window.location.pathname = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
