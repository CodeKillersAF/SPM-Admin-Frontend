import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:8000/api/admin'
})

export default instance;