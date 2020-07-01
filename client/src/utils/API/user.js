import axios from "axios";


export default {
  login: function (user) {
    return axios.post("/api/user/login", user)
  },
  signup: function (user) {
    return axios.post("/api/user/signup", user)
  },
  authenticate: () => axios.get("/api/user/authenticate"),
  signout: () => axios.get("/api/user/signout")

};
