import axios from 'axios';

const HOST = "https://newsletter-plus.herokuapp.com";

const get = (uri, callback, config = {}) => {
    axios.get(`${HOST}${uri}`, config).then(callback);
};

const post = (uri, data, callback, config = {}, error = null) => {
    axios.post(`${HOST}${uri}`, data, config).then(callback).catch(error);
};

export { get, post };