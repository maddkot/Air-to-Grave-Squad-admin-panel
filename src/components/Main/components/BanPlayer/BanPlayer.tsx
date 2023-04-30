import { Drawer, IconButton, TextField, MenuItem, Checkbox, Button, Snackbar } from '@mui/material';
import styles from './BanPlayer.module.scss';
import { banPlayer } from 'api/adminsPanel/adminPanels';
import { memo, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TDisconectPlayer } from 'types/mainTypes';

type TBanPlayer = {
    popup: boolean,
    setTogglePopup: (boolean: boolean) => void;
    player: TDisconectPlayer| null,
    setPlayer: (player: TDisconectPlayer|null) => void
}   

const BanPlayer = ({popup, setTogglePopup, player, setPlayer}:TBanPlayer) => {  
    
    const [openInfo, setOpenInfo] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [banReason, setBanReason] = useState({
        reason: '',
        duration: '',
        timeUnit: 'DAY',
        perm: false,
        steamId: '',
        nickname: ''
    });
    

    useEffect(() => {
        if (player) {
            setBanReason({ ...banReason, steamId: player.steamId, nickname: player.nickname  })  
        }
        
    }, [player])
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
    
    const handleCloseInfo = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenInfo(false);
        setApiMessage('')
    };
    

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
            setPlayer(null);
            setTogglePopup(false);
            setApiMessage(res.payload);
            setOpenInfo(true)
            return res            
        } catch (error) {
            console.log(error)
        }
    }
    
    const playerlink = `https://steamcommunity.com/profiles/${player?.steamId}/` 
    return (
        <>
        <Drawer
            sx={{ '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0.3)' } }}
            anchor={'right'}
            open={popup}
            onClose={() => setTogglePopup(false)}
        >
            <IconButton
                className={styles.onClose}
                onClick={() => {
                    setTogglePopup(false);
                    setPlayer(null);
                }}>
                    <CloseIcon />
            </IconButton>
                
            {<div className={styles.container}>
                    <h3>Забанить</h3>
                    <h4 style={{margin: '3px'}}>Никнейм: {player?.nickname}</h4>
                    <span>Ссылка на steam: <a className={styles.link} href={playerlink} target='_blank' rel="noreferrer">{player?.steamId}</a></span>
                <TextField label="Введите причину" variant="outlined" onChange={handlerBanReasonPlayer} value={banReason.reason} />
                <div className={styles.inputContainer}>
                    <TextField
                        label="Введите никнейм"
                        onChange={handlerNickBan}
                        value={banReason.nickname}
                        sx={{ width: '100%' }} />
                    <TextField
                        label="Введите steamId"
                        onChange={handlerSteamIdBan}
                        value={banReason.steamId}
                        sx={{ width: '100%' }} />
                    <TextField
                        label="Выберите продолжительность"
                        sx={{ width: '100%' }}
                        onChange={handlerTimeBan}
                        value={banReason.duration}
                        type='number'/>
                    <TextField
                        select
                        label="Cрок"
                        defaultValue={'DAY'}
                        required
                        onChange={handlerBanPeriodPlayer}
                        sx={{ width: '100%' }}
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
                <Button onClick={BanPlayer} variant="contained">Отправить</Button>
            </div>}
        </Drawer>
        <Snackbar
            open={openInfo}
            autoHideDuration={2000}
            onClose={handleCloseInfo}
            message={apiMessage}
            security='info' />
    </>
    )
}

export default memo(BanPlayer)