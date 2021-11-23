import axios from 'axios';
const instance = axios.create({baseURL: 'https://zomato-express.herokuapp.com'});
export default instance;