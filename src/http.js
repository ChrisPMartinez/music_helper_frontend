import axios from 'axios';

let http = axios.create({
    baseURL: 'http://localhost:8012',
    headers: {
        'Content-type': 'application/json'
    }
})

export default http