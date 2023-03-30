import axios from "axios";
import {setupInterceptorsTo} from './interceptorsConfig';

const customAxiosInstatnce = axios.create({
  // baseURL: '/api/v1',
})

setupInterceptorsTo(customAxiosInstatnce);

export default customAxiosInstatnce;
