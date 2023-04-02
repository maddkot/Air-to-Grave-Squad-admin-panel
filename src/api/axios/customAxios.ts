import axios from "axios";
import {setupInterceptorsTo} from './interceptorsConfig';

const customAxiosInstatnce = axios.create({
   baseURL: 'http://46.174.48.229:57495',
})

setupInterceptorsTo(customAxiosInstatnce);

export default customAxiosInstatnce;
