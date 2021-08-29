import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || `https://api.${window.location.hostname
    .split('.')
    .slice(-2)
    .join('.')}`;
const headers = {};

if (localStorage.token) {
    headers.Authorization = `Bearer  ${localStorage.token}`;
}

const instance = axios.create({
    baseURL,
    headers,
});

export default instance;
