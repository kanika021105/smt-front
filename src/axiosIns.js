// jshint esversion:9

import axios from 'axios';

const instance = axios.create({
    baseURL:
        process.env.REACT_APP_BASE_URL
        || `https://api.${window.location.hostname
            .split('.')
            .slice(-2)
            .join('.')}`,
});

instance.defaults.headers.common.Authorization = `Bearer  ${localStorage.getItem(
    'token',
)}`;

export default instance;
