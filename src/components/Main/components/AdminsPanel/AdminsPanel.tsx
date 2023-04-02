import styles from './AdminPanel.module.scss';
import {useQuery} from '@tanstack/react-query'
import { banPlayer, getGameinfo, setNextLayer } from "api/adminsPanel/adminPanels";
import { Box, Button, Checkbox, CircularProgress, Drawer, IconButton, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import Team from '../Team/Team';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type TPlayer = {
    id: number,
    kit: string,
    leader: boolean,
    nickname: string,
    squadId: number,
    steamId: string,
    teamId: number
}

type TSquad = {
    creatorName: string,
    creatorSteamId: string,
    id: number,
    locked: boolean,
    name: string,
    size: number,
    teamId: number
}

const maps = [
    'Mutaha_RAAS_v7',
    'Albasrah_Invasion_v6'
    , 'Kamdesh_AAS_v1',
    'Manicouagan_RAAS_v5',
    'Kohat_AAS_v1',
    'Chora_RAAS_v1',
    'Yehorivka_RAAS_v07',
    'BlackCoast_RAAS_v4',
    'Harju_Invasion_v1',
    'Narva_RAAS_v4',
    'Lashkar_AAS_v3',
    'Fallujah_Invasion_v1',
    'Kokan_AAS_v1',
    'Harju_AAS_v3',
    'Gorodok_RAAS_v12',
    'Belaya_RAAS_v1',
    'FoolsRoad_RAAS_V5',
    'BlackCoast_AAS_v1',
    'Chora_AAS_v6',
    'Mutaha_RAAS_v2',
    'BlackCoast_RAAS_v2',
    'Skorpo_RAAS_v3',
    'Logar_AAS_v1',
    'Manicouagan_AAS_v1',
    'Fallujah_RAAS_v7',
    'FoolsRoad_AAS_V2',
    'Manicouagan_RAAS_v7',
    'Narva_AAS_v3',
    'Yehorivka_RAAS_v09',
    'Tallil_RAAS_v3',
    'Albasrah_RAAS_v1',
    'Yehorivka_AAS_v4',
    'Belaya_RAAS_v2',
    'Gorodok_RAAS_v07',
    'Sumari_AAS_v2',
    'Kohat_Invasion_v1',
    'Narva_RAAS_v3',
    'Tallil_RAAS_v7',
    'Kamdesh_RAAS_v1',
    'Mestia_AAS_v1',
    'Gorodok_RAAS_v10',
    'Skorpo_RAAS_v1',
    'BlackCoast_AAS_v2',
    'Harju_RAAS_v6'
]
    
const AdminsPanel = () => {

    const playersRoles = JSON.parse(localStorage.getItem('userData') || '{}');
    const accessRoles = playersRoles.roles.includes('ADMIN');
    const [openInfo, setOpenInfo] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [banReason, setBanReason] = useState({
        reason: '',
        duration: '',
        timeUnit: 'DAY',
        perm: false,
        steamId: '',
        nickname: ''
    });
    const [popup, setTogglePopup] = useState(false);
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: getGameinfo,
        refetchInterval: 4000
    });

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

    
       
    const handleChangeLayer = (event: SelectChangeEvent) => {        
        nextLayer(event.target.value as string)
      };
      
    const teamOne: TPlayer[] = [];
    const teamTwo: TPlayer[] = [];
    data.gameInfo.playersList.forEach((item: any) => {
        if (item.teamId === 1) teamOne.push(item)
        else { teamTwo.push(item)}
    })   

    const squadsInfoTeamOne: TSquad[] = [];
    const constSquadInfoTeamTwo: TSquad[] = [];
    data.gameInfo.squadsList.forEach((item: any) => {
        if (item.teamId === 1) squadsInfoTeamOne.push(item)
        else { constSquadInfoTeamTwo.push(item)}
    }) 

    const nextLayer = async (layer: string) => {
        try {
            setDisabled(true)
            const res = await setNextLayer(layer)
            openMesageInfo(res.payload)            
            setDisabled(false);
            return res;
        } catch (error) {
            console.log(error)
        }

    }
    

    const handleCloseInfo = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenInfo(false);
        setApiMessage('')
    };
    
    const openMesageInfo = (res: any) => {        
        setApiMessage(res);
        setOpenInfo(true);        
        return
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
            setTogglePopup(false)
            return res            
        } catch (error) {
            console.log(error)
        }
    }
    const banDisconnectPlayer = (item: any) => {
        
        setBanReason({...item, steamId: item.steamId, nickname: item.nickname, perm: banReason.perm, timeUnit: banReason.timeUnit  })
        toggleDrawer(true);
    }
    return (
        <>
            <header className={styles.headerMainInfo}>
                <h4 className={styles.title}>Текущая карта: <span className={styles.subtitle}>{data.gameInfo.layer}</span></h4>
                <h4 className={styles.title}>Следующая карта: <span className={styles.subtitle}>{data.gameInfo.nextLayer}</span>{accessRoles && <Select disabled={disabled} disableUnderline={true} className={styles.selectMap} size='small' sx={{
                    ':before': {
                        borderBottom: 'none'
                    }, ':hover': { borderBottom: 'none' }
                }} value='' onChange={handleChangeLayer} variant='standard' >
                    {maps.map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>}</h4>
                <h4 className={styles.title}>Игроков на сервере: <span className={styles.subtitle}>{data.gameInfo.playersList.length}</span></h4>
            </header>
            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    <div className={styles.disconnectedPlayersContainer} >
                        <h3 className={styles.disconnectedPlayersTitle}>Отключенные пользователи:</h3>
                        {                  
                            <div className={styles.disconnectPlayers}>
                                {data.disconnectedPlayers.reverse().map((item: any) => {
                                    const playerlink = `https://steamcommunity.com/profiles/${item.steamId}/`
                                    return (
                                        <div className={styles.disconectPlayerContainer} key={item.steamId + Math.random()} >
                                            <h4 onClick={() => banDisconnectPlayer(item)} className={styles.disconnectedPlayersItem}>{item.nickname}</h4>
                                        <a className={styles.link} href={playerlink} target='_blank' rel="noreferrer">{item.steamId}</a>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            
                        }
                    </div>
                    <div className={styles.disconnectedPlayersContainer} >
                    <h3 className={styles.disconnectedPlayersTitle}>История карт:</h3>
                    {                  
                        <div className={styles.disconnectPlayers}>
                                {data.layerHistory.map((item: any) => {
                                    const startDate = new Date(item.startDate).toLocaleString()
                                return (<div style={{ margin: '10px' }} key={item.startDate + Math.random()} >
                                        <h4 className={styles.disconnectedPlayersTitle}>{item.layerName}</h4>
                                        <span>{startDate}</span>
                                    </div>
                            )})}
                        </div>
                        
                        
                    }
                </div>
                </div>
                
                <div className={styles.teamContainer}>
                    <Team team={teamOne} teamName={data.gameInfo.teams[0].name } squadList={squadsInfoTeamOne}/>
                    <Team team={teamTwo} teamName={data.gameInfo.teams[1].name } squadList={constSquadInfoTeamTwo} />
                </div>                
                                 
            </main>
            <Snackbar
                open={openInfo}
                autoHideDuration={2000}
                onClose={handleCloseInfo}
                message={apiMessage}
                security='info'                                
            />
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
                    <Checkbox disabled={!accessRoles} checked={banReason.perm} onChange={handlerPermBan} /><span>Выписать пермач</span>
                </div>                    
                <Button  onClick={BanPlayer} variant="contained">Отправить</Button>
            </div>}
            </Drawer>
        }
        </>
        
    )
}

export default AdminsPanel;