import axios from "axios";

const instance = axios.create({
    baseURL:'https://kasuki-backend.herokuapp.com/api/admin'
})

export default instance;