import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import styles from './PlayerPunishmentHistory.module.scss'
import { getPlayerHistory } from 'api/adminsPanel/adminPanels'
import { useState, useEffect } from 'react'


type TPlayerPunishmentHistory = {
    admin: string,
    cancelled: boolean,
    cancelledAdmin: string,
    cancelledReason: string,
    duration: number,
    durationUnit: string,
    endDate: string,
    nickname: string,
    perm: boolean,
    reason: string,
    startDate: string,
    steamId: string
}

type Tprops = {
    steamIdProps: string
}

export const PlayerPunishmentHistory = ({ steamIdProps }: Tprops) => {  
    const [playerPunishhistory, setplayerPunishhistory] = useState([])
    useEffect( () => {
        const getInfo = async () => {
            const res = await getPlayerHistory(steamIdProps)
            return res;
        }
        getInfo().then(res => setplayerPunishhistory(res))
        
    }, [steamIdProps])

    const period2 = [
        {
            value: 'DAY',
            label: 'дней',
        },
        {
            value: 'MINUTE',
            label: 'минут',
        },
        {
            value: 'SECOND',
            label: 'секунд',
        },          
    ]


    const correctNamePeriod = (i: string) => {
        return period2.find(item => item.value === i)?.label
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.PlayerPunishmentHistoryTitle}>История наказаний:</h3>
            <TableContainer >
              <Table>           
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: '600'}} align="left">Кто забанил:</TableCell>
                        <TableCell sx={{fontWeight: '600'}} align="left">Время завершения:</TableCell>
                        <TableCell sx={{ fontWeight: '600' }} align="left">Длинна:</TableCell>
                        <TableCell sx={{fontWeight: '600'}} align="left">Причина:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        playerPunishhistory.map((item: TPlayerPunishmentHistory) => {
                            const perm = item.startDate === item.endDate && 'Пермач';
                            const delayedTime = perm || `${item.duration} ${correctNamePeriod(item.durationUnit)}`
                            const finish = new Date(item.endDate);
                            return (
                                <TableRow key={item.steamId + Math.random()} >
                                    <TableCell style={{width: '50px', padding: '10px'}} align="left">{item.admin}</TableCell>                                    
                                    <TableCell style={{width: '50px', padding: '10px'}} align="left">{perm || finish.toLocaleString()}</TableCell>
                                    <TableCell style={{width: '50px', padding: '10px'}} align="left">{delayedTime}</TableCell>
                                    <TableCell size='small' style={{width: '200px', height: '40px', padding: '10px'}} align="inherit">{item.reason}</TableCell>
                                </TableRow>   
                            )
                        })
                    }
                    </TableBody>
             </Table>
            </TableContainer>
        </div>
    )
}