import customAxios from 'api/axios/customAxios';
import axios from 'axios';

export const getGameinfo = async () => {
    try {
        const response = await customAxios.get('/gameinfo');
        return response.data
    } catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
};

export const getBansInfo = async () => {
    try {
        const response = await customAxios.get(`/bans/active`, {
            params: {
              limit: 150  
            }
        });
        return response.data
    } catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
};

export const warnPlayer = async ({ item, value }: {item: any, value: string}) => {
    try {
        const response = await customAxios.post('/command/warnplayer', {
                steamId: item.steamId,
                nickname: item.nickname,
                message: value
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}

export const kickPlayer = async ({ item, value }: {item: any, value: string}) => {
    try {  
        const response = await customAxios.post('/command/kick', {
                steamId: item.steamId,
                nickname: item.nickname,
                reason: value
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}

export const banPlayer = async ({ item, value }: {item: any, value: any}) => {
    try {  
        const response = await customAxios.post('/command/ban', {
                steamId: item.steamId,
                nickname: item.nickname,
                duration: value.duration,
                timeUnit: value.timeUnit,
                reason: value.reason,
                perm: value.perm
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}

export const unbanPlayer = async ({ item, value }: {item: any, value: any}) => {
    try {  
        const response = await customAxios.post('/command/unban', {
                steamId: item.steamId,                
                reason: value
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}

export const warnSquadApi = async ({ item, value }: {item: any, value: string}) => {
    try {
        const response = await customAxios.post('/command/warnsquad', {
                id: item.id,
                teamId: item.teamId,
                message: value
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}

export const banSquadApi = async ({ item, value }: {item: any, value: string}) => {
    try {
        const response = await customAxios.post('/command/disbandsquad', {
                id: item.id,
                teamId: item.teamId,
                message: value
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error, 'errorCatch');
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        }
    }
}