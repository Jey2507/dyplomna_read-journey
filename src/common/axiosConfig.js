import axios from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default axios;
