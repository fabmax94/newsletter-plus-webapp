import axios from 'axios';

const HOST = "https://newsletter-plus.herokuapp.com";

const get = (uri, callback) => {
    axios.get(`${HOST}${uri}`).then(callback);
};

const post = (uri, data, headers, callback) => {
    axios.post(`${HOST}${uri}`, data, {
        headers: headers
    }).then(callback);
};

export { get, post };