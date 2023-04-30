import styles from './Bans.module.scss'
import { Box, Button, Checkbox, CircularProgress, Drawer, IconButton, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { banPlayer, getBansInfo, unbanPlayer } from "api/adminsPanel/adminPanels";
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BanPlayer from 'components/Main/components/BanPlayer/BanPlayer';

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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Bans = () => {
    const playersRoles = JSON.parse(localStorage.getItem('userData') || '{}');
    const accessRoles = !playersRoles.roles.includes('ADMIN');
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['repoBans'],
        queryFn: getBansInfo,

        retry: 0
    });
    
    const [players, setPlayers] = useState([])
    useEffect(() => {        
        if(data) setPlayers(data)
    }, [data])
    const handlerFindPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            const filterArray = data.filter((item: any) => {                
                const itemL = item.nickname.toLowerCase()
                const steamId = item.steamId
                const eventL = event.target.value.toLowerCase()
                return itemL.includes(eventL) || steamId.includes(eventL)
                })
            setPlayers(filterArray)
        } else (
            setPlayers(data) 
        )
    }

    const unban = async (item: any) => {
        try {
            const res = await unbanPlayer({ item, value: 'Разбанили' });
            refetch();
            handlerModal(false)
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

    const [banReason, setBanReason] = useState({
        reason: '',
        duration: '',
        timeUnit: 'DAY',
        perm: false,
        steamId: '',
        nickname: ''
    });
    
    

    const [selectPlayer, setSelectPlayer] = useState<any>();
    const [unbanPlayerItem, setUnbanPlayer] = useState<any>();
    const [changTimePlayer, setChangeTimePlayer] = useState({
        duration: '',
        timeUnit: 'DAY',
        perm: false
        
    })
    
    const handlerChangeBanPeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeTimePlayer({...changTimePlayer, timeUnit: event.target.value})
    }

    const handlerChangeTimeBan = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setChangeTimePlayer({...changTimePlayer, duration: event.target.value})
    }

    const handlerChangePermBan = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setChangeTimePlayer({...changTimePlayer, perm: event.target.checked})
    }

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
    const [changeTime, setChangeTime] = useState(false);
    const [modal, setModal] = useState(false)
    const handlerModal = (open: boolean) => setModal(open);
    const toggleDrawer = (open: boolean) => setTogglePopup(open);
    const toggleChangeTimePlayer = (open: boolean) => {
        setChangeTime(open)
        setChangeTimePlayer({
            duration: '',
            timeUnit: 'DAY',
            perm: false
        })
    }

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

    const changTime = async (item: any) => {
        try {
            const changeInfo = {...changTimePlayer, reason: item.reason}
            await unbanPlayer({ item, value: 'Разбанили' });
            const resBan = await banPlayer({ item: item, value: changeInfo });
            refetch();
            setChangeTime(false)
            setChangeTimePlayer({
                duration: '',
                timeUnit: 'DAY',
                perm: false 
            })
            return resBan
        } catch (error) {
            alert(error)
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
    console.log(selectPlayer, 'selectPlayer')
    return (
        <>
            <div className={styles.buttonsmainContainer}>
                <div className={styles.inputContainer}>
                    <Button variant="contained" onClick={() => refetch()}>Обновить список</Button>
                    <Button variant="contained" color="error" onClick={() => toggleDrawer(true)}>Забанить игрока</Button>
                </div>
                <TextField sx={{ width: '350px'}} label="Найти игрока" variant="outlined" onChange={handlerFindPlayer}/>
            </div>      
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>                    
                    <TableCell sx={{fontWeight: '600'}} align='center'>Никнейм</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="left">SteamId</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="left">Время начала</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="left">Время завершения</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="left">Продолжительность</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="left">Причина</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="left">Кто забанил</TableCell>
                    <TableCell sx={{fontWeight: '600'}} align="center">Управление</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                            {players && (players.map((item: TBans) => {
                                const start = new Date(item.startDate);
                                const finish = new Date(item.endDate);
                                const perm = item.startDate === item.endDate && 'Пермач'
                                const delayedTime = perm || `${item.duration} ${correctNamePeriod(item.durationUnit)}`
                                const acceptUnban = !accessRoles || item.admin === playersRoles.nickname
                                return (
                                <TableRow key={item.steamId}>                            
                                    <TableCell align='center'>{item.nickname}</TableCell>
                                    <TableCell align="left">{<a className={ styles.link} href={`https://steamcommunity.com/profiles/${item.steamId}/`} target='_blank' rel="noreferrer">{item.steamId}</a>}</TableCell>
                                    <TableCell align="left">{perm || start.toLocaleString()}</TableCell>
                                    <TableCell align="left">{perm || finish.toLocaleString()}</TableCell>
                                    <TableCell align="left">{delayedTime}</TableCell>
                                    <TableCell style={{maxWidth: '300px'}} align="left">{item.reason}</TableCell>
                                    <TableCell align="left">{item.admin}</TableCell>
                                        <TableCell align="left">{acceptUnban && <div className={styles.buttonsmainContainer}><Button variant="contained" color="error" onClick={() => { setChangeTime(true); setSelectPlayer(item) }}>Изменить срок</Button><Button variant="contained" color="success" onClick={() => { setUnbanPlayer(item); handlerModal(true)}}>Разбанить игрока</Button></div> }</TableCell>   
                                </TableRow>
                        
                            )}))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <BanPlayer popup={popup} setTogglePopup={setTogglePopup} setPlayer={handlerBanReason} player={null } /> */}
            
                
            {   <Drawer
                        sx={{'& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0.3)'}}}
                        anchor={'right'}
                        open={popup}
                        onClose={() => toggleDrawer(false)}
                >   
                     <IconButton className={styles.onClose} onClick={() => setTogglePopup(false)}><CloseIcon /></IconButton>
                    {<div className={styles.container}>
                    <h3>Забанить</h3>
                    <TextField label="Введите причину" variant="outlined" onChange={handlerBanReasonPlayer} value={banReason.reason} />
                <div className={styles.banInputContainer}>
                        <TextField
                            label="Введите никнейм"  
                            onChange={handlerNickBan}
                            value={banReason.nickname}
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            label="Введите steamId"                            
                            onChange={handlerSteamIdBan}
                            value={banReason.steamId}
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            label="Выберите продолжительность"
                            sx={{ width: '100%' }}
                            onChange={handlerTimeBan}
                            value={banReason.duration}
                            type='number'
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
            { selectPlayer &&
                <Drawer
                    sx={{'& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0.3)'}}}
                    anchor={'right'}
                    open={changeTime}
                    onClose={() => toggleChangeTimePlayer(false)}
                >
                    <IconButton className={styles.onClose} onClick={() => toggleChangeTimePlayer(false)}><CloseIcon /></IconButton>
                    <div className={styles.container}>
                        <h3>Изменить срок наказания</h3>
                        <h6>Никнейм: {selectPlayer.nickname}</h6>
                        <TextField
                            label="Выберите продолжительность"
                            sx={{ width: '100%' }}
                            onChange={handlerChangeTimeBan}
                            value={changTimePlayer.duration}
                            type='number'
                        />
                        <TextField          
                            select
                            label="Cрок"
                            defaultValue={'DAY'}
                            required
                            onChange={handlerChangeBanPeriod}
                            sx={{width: '100%'}}
                            >
                            {period.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div>
                            <Checkbox checked={changTimePlayer.perm} onChange={handlerChangePermBan} /><span>Выписать пермач</span>
                        </div>
                        
                        <Button onClick={() => changTime(selectPlayer)} variant="contained">Изменить</Button>
                    </div>
                </Drawer>
            }
            {
                <Modal
                    open={modal}
                    onClose={() => handlerModal(false)}
                    
                >   
                    <Box sx={style}>
                        <h4>Разбанить игрока {unbanPlayerItem && unbanPlayerItem.nickname } ?</h4> 
                        <Button sx={{margin: '10px'}} variant="contained" color="success" onClick={() => unban(unbanPlayerItem)}>Разбанить игрока</Button>
                        <Button sx={{margin: '10px'}} variant="contained" color="info" onClick={()=> handlerModal(false)}>Закрыть</Button>
                    </Box>
                     
                </Modal>
            }
            
        </>
    
       
    )
}
export default Bans;