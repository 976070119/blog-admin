import axios from 'axios';

export default function ajax (url, data = {}, type = 'GET') {
    if(type==='GET') {
        let params = '';
        Object.keys(data).forEach(key => {
            params += key + '=' + data[key] + '&';
        })
        return axios.get(url + '?' + params);
    } else {
        return axios.post(url, data);
    }
} 