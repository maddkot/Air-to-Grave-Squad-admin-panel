import axios from 'axios'

type TLoginData = {
    login: string,
    password: string
}

type TUserDataResponse = string[]

export const getUserData = async ({ login, password }: TLoginData) => {    
    const data = window.btoa(login + ':' + password);    
    try {
        const response = await axios.post<TUserDataResponse>('/auth', data, {
            headers: {'Content-Type': 'text/plain', 'X-Requested-With': 'XMLHttpRequest'}
        })
        console.log(data, 'data')
        localStorage.setItem('token', data);
        console.log(response.data, 'data res')
        return response.data;
     } catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}