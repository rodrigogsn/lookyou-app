import axios from "axios";

const api = axios.create({
  baseURL: "https://lookyou-backend.herokuapp.com/"
});

export default api;
