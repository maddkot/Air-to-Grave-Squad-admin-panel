import styles from './Bans.module.scss'
import { Box, Button, Checkbox, CircularProgress, Drawer, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { banPlayer, getBansInfo, unbanPlayer } from "api/adminsPanel/adminPanels";
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type TBans = {
    steamId: string,
    nickname: string,
    startDate: string,
    endDate: string,
    duration: number,
    durationUnit: string,
    admin: string,
    reason: string,
    perm: boolean,
    cancelled: boolean,
    cancelledReason: string | null,
    cancelledAdmin: string
}

const Bans = () => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['repoBans'],
        queryFn: getBansInfo,

        retry: 0
    });
    
    const unban = async (item: any) => {
        try {
            const res = await unbanPlayer({ item, value: 'Разбанили' });
            
            refetch();
            return res            
        } catch (error) {
            console.log(error)
        }
    }

    const period = [
        {
            value: 'DAY',
            label: 'дни',
        },
        {
            value: 'MINUTE',
            label: 'минуты',
        },
        {
            value: 'SECOND',
            label: 'секунды',
        },
          
    ]

    const [banReason, setBanReason] = useState({
        reason: '',
        duration: '',
        timeUnit: 'DAY',
        perm: false,
        steamId: '',
        nickname: ''
    });
    const handlerBanReasonPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanReason({ ...banReason, reason: event.target.value })
    }
    const handlerBanPeriodPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanReason({ ...banReason, timeUnit: event.target.value })
    }
    const handlerTimeBan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanReason({ ...banReason, duration: event.target.value })
    }
    const handlerPermBan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanReason({ ...banReason, perm: event.target.checked })
    }
    const handlerSteamIdBan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanReason({ ...banReason, steamId: event.target.value })
    }
    const handlerNickBan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanReason({ ...banReason, nickname: event.target.value })
    }

    const [popup, setTogglePopup] = useState(false);

    const toggleDrawer = (open: boolean) => setTogglePopup(open);

    const BanPlayer = async () => {
        try {            
            const res = await banPlayer({ item: banReason , value: banReason });
            setBanReason({
                reason: '',
                duration: '',
                timeUnit: 'DAY',
                perm: false,
                steamId: '',
                nickname: ''
            });
            refetch();
            setTogglePopup(false)
            return res            
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return (
        <Box className={styles.isLoading}>
            <CircularProgress color="inherit" />        
        </Box>
    )

    if (error) return (
        <Box className={styles.isError}>
            <h1>Ошибка загрузки</h1>
            <p>Обновите страницу</p>
        </Box>
    )  

    

    return (
        <>
                   
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Никнейм</TableCell>
                    <TableCell align="left">SteamId</TableCell>
                    <TableCell align="left">Время начала</TableCell>
                    <TableCell align="left">Время завершения</TableCell>
                    <TableCell align="left">Причина</TableCell>
                    <TableCell align="left">Кто забанил</TableCell>
                    <TableCell align="left">{ <div className={styles.inputContainer}><button onClick={() => refetch()}>Обновить список</button><button onClick={() => toggleDrawer(true)}>Забанить игрока</button></div>}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                            {data && (data.map((item: TBans) => {
                                const start = new Date(item.startDate);
                                const finish = new Date(item.endDate);
                                const perm = item.startDate === item.endDate && 'Пермач' 
                                return (
                                <TableRow key={item.steamId}>                            
                                    <TableCell>{item.nickname}</TableCell>
                                        <TableCell align="left">{<a className={ styles.link} href={`https://steamcommunity.com/profiles/${item.steamId}/`} target='_blank' rel="noreferrer">{item.steamId}</a>}</TableCell>
                                    <TableCell align="left">{perm || start.toLocaleString()}</TableCell>
                                    <TableCell align="left">{perm ||finish.toLocaleString()}</TableCell>
                                    <TableCell align="left">{item.reason}</TableCell>
                                    <TableCell align="left">{item.admin}</TableCell>
                                    <TableCell align="left">{<button onClick={()=> unban(item)}>Разбанить игрока</button>}</TableCell>   
                                </TableRow>
                        
                            )}))}
                </TableBody>
              </Table>
            </TableContainer>
            {
                
                    <Drawer
                        sx={{'& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0.3)'}}}
                        anchor={'right'}
                        open={popup}
                        onClose={() => toggleDrawer(false)}
                >   
                     <IconButton className={styles.onClose} onClick={() => setTogglePopup(false)}><CloseIcon /></IconButton>
                    {<div className={styles.container}>
                    <h3>Забанить</h3>
                    <TextField label="Введите причину" variant="outlined" onChange={handlerBanReasonPlayer} value={banReason.reason} />
                <div className={styles.inputContainer}>
                        <TextField
                            label="Введите никнейм"  
                            onChange={handlerNickBan}
                            value={banReason.nickname}
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            label="Введите steaId"                            
                            onChange={handlerSteamIdBan}
                            value={banReason.steamId}
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            label="Выберите продолжительность"
                            sx={{ width: '100%' }}
                            onChange={handlerTimeBan}
                            value={banReason.duration}
                        />
                        <TextField          
                            select
                            label="Cрок"
                            defaultValue={'DAY'}
                            required
                            onChange={handlerBanPeriodPlayer}
                            sx={{width: '100%'}}
                            >
                            {period.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                    </div>
                    <div>
                        <Checkbox checked={banReason.perm} onChange={handlerPermBan} /><span>Выписать пермач</span>
                    </div>                    
                    <Button disabled={banReason.reason.length <= 0 && true} onClick={BanPlayer} variant="contained">Отправить</Button>
                </div>}
                </Drawer>
            }
        </>
    
       
    )
}
export default Bans;