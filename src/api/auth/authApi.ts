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
        
        localStorage.setItem('token', data);
        
        return response.data;
     } catch (error) {
        
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}