
import { useCallback, useState } from 'react';
import styles from './Player.module.scss';

import sl from 'assets/images/kit_icons/sl.png';
import LAT from 'assets/images/kit_icons/rpg.png';
import HAT from 'assets/images/kit_icons/heavyrpg.png';
import AR from 'assets/images/kit_icons/AutomaticRifleman.png';
import Medic from 'assets/images/kit_icons/medic.png';
import Rifleman from 'assets/images/kit_icons/rifleman.png';
import Grenadier from 'assets/images/kit_icons/gp.png';
import MachineGunner from 'assets/images/kit_icons/heavugunner.png';
import Marksman from 'assets/images/kit_icons/sniper.png';
import Engineer from 'assets/images/kit_icons/engeneer.png';
import Crewman from 'assets/images/kit_icons/crewman.png';
import Recruit from 'assets/images/kit_icons/nokit.png';
import SLPilot from 'assets/images/kit_icons/slpilot.png';
import SLCrewman from 'assets/images/kit_icons/slTex.png';
import Ambusher from 'assets/images/kit_icons/rangeer.png';
import Infiltrator from 'assets/images/kit_icons/babah.png';
import Pilot from 'assets/images/kit_icons/pilot.png';
import { Drawer, Snackbar } from '@mui/material';
import React from 'react';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

type TPlayer = {
    id: number,
    kit: string,
    leader: boolean,
    nickname: string,
    squadId: number,
    steamId: string,
    teamId: number
}

type playerProps = {
    players: TPlayer[]
}

const Players = ({ players }: playerProps) => {
    
    const [popup, setTogglePopup] = useState(false);

    const toggleDrawer = (open: boolean) => setTogglePopup(open);
   /*  (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setTogglePopup(open);
    }; */

/*     const handlerWarPlayer = async (item: any, value: any) => {
        try {
            const res = await warnPlayer({ item, value });
            console.log(res, 'res warn');
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handlerValue = (event: any) => {
        setValue(event.target.value)
    } */


    const icons:any = {
        LAT: LAT,
        HAT: HAT,
        AR: AR, // легкий пулемет
        Medic: Medic,
        Rifleman: Rifleman,
        Grenadier: Grenadier,
        MachineGunner: MachineGunner,
        Marksman: Marksman,
        Engineer: Engineer,
        Crewman: Crewman,
        Recruit: Recruit,
        SLPilot: SLPilot,
        SL: sl,
        SLCrewman: SLCrewman,
        Unarmed: Recruit,
        Ambusher: Ambusher,
        Infiltrator: Infiltrator,
        Saboteur: Infiltrator,
        Pilot: Pilot
    }
    const [playerItem, setItem] = useState<TPlayer | null>(null)

    const selectItem = useCallback((item: TPlayer) => {
        setItem(item)
        toggleDrawer(true);
        
    }, [])

    const [openInfo, setOpenInfo] = useState(false);
    const [apiMessage, setApiMessage] = useState('')

    const openMesageInfo = (res: any) => {        
        setApiMessage(res);
        setOpenInfo(true);
        toggleDrawer(false)
        return
    }

    const handleCloseInfo = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenInfo(false);
        setApiMessage('')
      };
    
    return (
        <React.Fragment>
            {
                players.sort((a, b) => {
                    if (a.leader ) return -1
                    else return 0
                }).map((item: TPlayer) => {
                    const splitKitNames = item.kit.split('_')[1]
                    const src = icons[splitKitNames];
                    
                    return (
                        <React.Fragment key={item.steamId}>
                            <button onClick={() => selectItem(item)}  className={styles.button}>
                                <h5 className={styles.title}>{item.nickname}</h5>
                                <img className={styles.icons} src={src} alt="иконка игрока" />
                            </button>
                            {
                                playerItem &&
                                <Drawer
                                    sx={{'& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0.3)'}}}
                                    anchor={'right'}
                                    open={popup}
                                    onClose={() => toggleDrawer(false)}
                                >   
                                    {<PlayerInfo
                                        item={playerItem}
                                        onClose={() => toggleDrawer(false)}
                                        openMesageInfo={openMesageInfo}
                                    />}
                                </Drawer>
                            }
                            <Snackbar
                                open={openInfo}
                                autoHideDuration={2000}
                                onClose={handleCloseInfo}
                                message={apiMessage}
                                security='info'                                
            />
                            </React.Fragment>
                    )
                } )
            }
        </React.Fragment>
        
    )
}

export default Players;