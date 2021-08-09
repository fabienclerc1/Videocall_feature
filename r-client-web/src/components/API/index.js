import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const Axios = axios.create({
    baseURL: baseURL,
})

Axios.defaults.baseURL = baseURL;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;