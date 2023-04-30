import styles from './PlayerInfo.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Checkbox, MenuItem, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { warnPlayer, kickPlayer, banPlayer  } from 'api/adminsPanel/adminPanels';
import { memo, useState } from 'react';
import { TPlayer } from 'types/mainTypes';


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

const Playerinfo = memo(({ item, onClose, openMesageInfo }: { item: TPlayer, onClose: () => void, openMesageInfo: (res: any) => void }) => {
    const playersRoles = JSON.parse(localStorage.getItem('userData') || '{}');
    const accessRoles = !playersRoles.roles.includes('ADMIN');
    const [warn, setWarn] = useState('');
    const handlerWarnPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWarn(event.target.value)
    }

    const [kickReason, setKickReason] = useState('');
    const handlerKicknPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKickReason(event.target.value)
    }
    
    const [banReason, setBanReason] = useState({
        reason: '',
        duration: '',
        timeUnit: 'DAY',
        perm: false
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

    const WarPlayer = async () => {
        try {
            const res = await warnPlayer({ item, value: warn });
            setWarn('');
            openMesageInfo(res.payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const KickPlayer = async () => {
        try {
            const res = await kickPlayer({ item, value: kickReason });
            setKickReason('');
            openMesageInfo(res.payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const BanPlayer = async () => {
        try {
             const res = await banPlayer({ item, value: banReason });
            setBanReason({
                reason: '',
                duration: '',
                timeUnit: 'DAY',
                perm: false
            });
            openMesageInfo(res.payload)
            return res            
        } catch (error) {
            console.log(error)
        }
    }

    const playerlink = `https://steamcommunity.com/profiles/${item.steamId}/`
    return (
        <div className={styles.rootContainer}>
            <IconButton className={styles.onClose} onClick={onClose}><CloseIcon /></IconButton>
            <div className={styles.playerInfoContainer}>
                <h1>{item.nickname}</h1>
                <p>SteamId: <a className={styles.link} href={playerlink} target='_blank' rel="noreferrer">{item.steamId}</a></p>
                <div className={styles.container}>
                    <h3>Отправить сообщение игроку</h3>
                    <TextField label="Введите сообщение" variant="outlined" onChange={handlerWarnPlayer} value={warn}/>
                    <Button disabled={warn.length <= 0 && true} onClick={WarPlayer} variant="contained">Отправить</Button>
                </div>
                <div className={styles.container}>
                    <h3>Кикнуть</h3>
                    <TextField label="Введите причину" variant="outlined" onChange={handlerKicknPlayer} value={kickReason} />
                    <Button disabled={kickReason.length <= 0 && true} onClick={KickPlayer} variant="contained">Отправить</Button>
                </div>
                <div className={styles.container}>
                    <h3>Забанить</h3>
                    <TextField label="Введите причину" variant="outlined" onChange={handlerBanReasonPlayer} value={banReason.reason} />
                    <div>
                        <TextField
                            label="Выберите продолжительность"
                            sx={{ width: '70%' }}
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
                            sx={{width: '30%'}}
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
                </div>
            </div>
            
        </div>
    )
})

export default Playerinfo;