import axios from 'axios';

const development = "https://localhost:7151/api"

const insuranceApi = axios.create({
    baseURL: development
});

export default insuranceApi;