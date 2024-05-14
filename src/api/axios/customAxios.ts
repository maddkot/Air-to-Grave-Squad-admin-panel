import axios from "axios";
import {setupInterceptorsTo} from './interceptorsConfig';

const customAxiosInstatnce = axios.create({
})

setupInterceptorsTo(customAxiosInstatnce);

export default customAxiosInstatnce;
