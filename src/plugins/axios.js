import axios from "axios";

const API = axios.create({
    baseURL:"https://rickandmortyAPI.com/api"
})

export default API;
