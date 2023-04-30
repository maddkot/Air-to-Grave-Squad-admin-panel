import { TMainDataTypes, TDisconectPlayer } from 'types/mainTypes';
import styles from './LeftMainContainer.module.scss';
import { DisconnectPlayers } from '../DisconnectPlayers/DisconnectPlayers';
import { useState } from 'react';
import BanPlayer from '../BanPlayer/BanPlayer';




export const LeftMainContainer = ({ data }: { data: TMainDataTypes }) => {
    const { disconnectedPlayers } = data
    const [popup, setTogglePopup] = useState(false);
    const [player, setPlayer] = useState<TDisconectPlayer| null>(null)

    
    return (
        <div className={styles.container}>
            <DisconnectPlayers disconnectedPlayers={disconnectedPlayers} setTogglePopup={setTogglePopup} setPlayer={ setPlayer} />
            <BanPlayer popup={popup} setTogglePopup={setTogglePopup} player={player } setPlayer={ setPlayer}/>
        </div>
    )
}