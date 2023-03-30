import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";


const onRequest = (config: AxiosRequestConfig): any => {
    const authData = localStorage.getItem('token')!;
    if (!config.headers) return config;
    config.headers.Authorization = `Basic ${authData}`;    
    return config;
};


const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    const conf = error?.config
    if (error.response && error.response.status === 401 && !!conf?.url) {
        localStorage.removeItem('authData');
    }
    return Promise.reject(error);
};


export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};

