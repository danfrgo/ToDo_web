import axios from 'axios';

// conexao com backend
const api = axios.create({
    baseURL: 'http://localhost:3333'

});

export default api;