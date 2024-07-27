import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://test9-cashrina-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
