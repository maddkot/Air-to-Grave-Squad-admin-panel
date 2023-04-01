import { Button, IconButton, TextField } from '@mui/material';
import styles from './SquadItem.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { banSquadApi, warnSquadApi } from 'api/adminsPanel/adminPanels';

type TSquad = {
    creatorName: string,
    creatorSteamId: string,
    id: number,
    locked: boolean,
    name: string,
    size: number,
    teamId: number,
    players: TPlayer[]
}
type TPlayer = {
    id: number,
    kit: string,
    leader: boolean,
    nickname: string,
    squadId: number,
    steamId: string,
    teamId: number
}

const SquadItem = ({ item, onClose }: { item: TSquad, onClose: () => void }) => {
    
    const [disbandReason, setDisbandREason] = useState('');
    const handlerDisbandSquadReason = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisbandREason(event.target.value)
    }

    const [warnSquad, setWarnSquad] = useState('');
    const handlerWarnSquadReason = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWarnSquad(event.target.value)
    }

    const WarnSquad = async () => {
        try {
            const res = await warnSquadApi({ item, value: warnSquad });
            setWarnSquad('');
            //openMesageInfo(res.payload)
            onClose()
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const disbandSquad = async () => {
        try {
            const res = await banSquadApi({ item, value: disbandReason });
            setDisbandREason('');
            //openMesageInfo(res.payload)
            onClose()
            return res
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.rootContainer}>
            <IconButton className={styles.onClose} onClick={onClose}><CloseIcon /></IconButton>
            <div className={styles.infoContainer}>
                <h4>Создатель сквада: {item.creatorName} {<a className={ styles.link} href={`https://steamcommunity.com/profiles/${item.creatorSteamId}/`} target='_blank' rel="noreferrer">{item.creatorSteamId}</a>}</h4>
                <div className={styles.container}>
                    <h3>Отправить сообщение всему отряду</h3>
                    <TextField label="Введите сообщение" variant="outlined" onChange={handlerWarnSquadReason} value={warnSquad}/>
                    <Button disabled={warnSquad.length <= 0 && true} onClick={WarnSquad} variant="contained">Отправить сообщение</Button>
                </div>
                <div className={styles.container}>
                    <h3>Расформировать сквад</h3>
                    <TextField label="Введите причину" variant="outlined" onChange={handlerDisbandSquadReason} value={disbandReason}/>
                    <Button disabled={disbandReason.length <= 0 && true} onClick={disbandSquad} variant="contained">Расформировать</Button>
                </div>                
            </div>
            
        </div>
    )
}

export default SquadItem;