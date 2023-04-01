import styles from './Squad.module.scss';
import Players from '../Player/Players';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HttpsIcon from '@mui/icons-material/Https';
import { Button, Drawer } from '@mui/material';
import { useCallback, useState } from 'react';
import SquadItem from '../SquadItem/SquadItem';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

type TPlayer = {
    id: number,
    kit: string,
    leader: boolean,
    nickname: string,
    squadId: number,
    steamId: string,
    teamId: number
}

type squadsProps = {
    squad: TSquad[] 
}

type TSquad = {
    creatorName: string,
    creatorSteamId: string,
    id: number,
    locked: boolean,
    name: string,
    size: number,
    teamId: number,
    players: TPlayer[],
    leader: TPlayer[]
}

const Squads = ({ squad }: squadsProps) => {       
    
    const [squadSelected, setSquad] = useState<TSquad | null>(null);
    const [popup, setTogglePopup] = useState(false);

    const toggleDrawer = (open: boolean) => setTogglePopup(open);

    const selectSquad = useCallback((item: TSquad) => {
        setSquad(item)
        toggleDrawer(true);
        
    }, [])

    return (
        <>{
            squad.sort((a, b) => a.id - b.id).map((item: TSquad) => {
                const style = item.name === 'Без отряда' ? styles.withoutSquad : styles.squadContainer;
                return (
                    <div key={item.id} className={style}>
                        <div className={styles.titleContainer}>
                            <Button variant='text' color='info' onClick={() => selectSquad(item)} className={styles.squadName}>{item.name}</Button>
                            {!(item.name === 'Без отряда') && (item.locked ? < HttpsIcon sx={{ color: 'red' }} /> : <LockOpenIcon />)}
                            
                        </div>
                        {
                            !(item.name === 'Без отряда') && <h6 className={styles.creatorItem}>Создатель сквада: {item.creatorName} {<a className={styles.link} href={`https://steamcommunity.com/profiles/${item.creatorSteamId}/`} target='_blank' rel="noreferrer">{item.creatorSteamId}</a>} {item.creatorSteamId !== item.leader[0].steamId && <PriorityHighIcon sx={{ color: 'red', width: '15px' }} />}</h6>
                            
                        }
                        <Players players={item.players} />
                        {
                                squadSelected &&
                                <Drawer
                                    sx={{'& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0.3)'}}}
                                    anchor={'right'}
                                    open={popup}
                                    onClose={() => toggleDrawer(false)}
                                >   
                                    {
                                    <SquadItem item={squadSelected} onClose={() => toggleDrawer(false)}/>
                                    }
                                </Drawer>
                            }
                    </div>
                    
              )
          })      
        }
        </>       
    )
}

export default Squads;