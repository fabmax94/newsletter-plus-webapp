import axios from 'axios';

const HOST = "http://127.0.0.1:8000";

const get = (uri, callback) => {
    axios.get(`${HOST}${uri}`).then(callback);
};

const post = (uri, data, callback, config = {}, error = null) => {
    axios.post(`${HOST}${uri}`, data, config).then(callback).catch(error);
};

export { get, post };