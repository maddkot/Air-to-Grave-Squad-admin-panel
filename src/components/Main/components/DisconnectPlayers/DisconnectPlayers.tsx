import { TDisconectPlayer } from 'types/mainTypes';
import styles from './Disconnectplayers.module.scss';

type TDisconnectPlayers = {
    disconnectedPlayers: TDisconectPlayer[];
    setTogglePopup: (boolean: boolean) => void;
    setPlayer: (player: TDisconectPlayer) => void
}

export const DisconnectPlayers = ({ disconnectedPlayers, setTogglePopup, setPlayer }:TDisconnectPlayers ) => {
    
    return (
        <>
            <h3 className={styles.disconnectedPlayersTitle}>Отключенные пользователи:</h3>
                {                  
                    <div className={styles.disconnectPlayersContainer}>
                        {disconnectedPlayers.map((item: TDisconectPlayer) => {                                    
                             return (                                        
                                <button
                                    key={item.steamId + Math.random()}
                                     onClick={() => {
                                         setTogglePopup(true)
                                         setPlayer(item)
                                     }}
                                    className={styles.disconectPlayer}
                                >
                                    {item.nickname} ({new Date(item.disconnectedTime).toLocaleTimeString()})
                                </button>
                                    )
                                })}
                    </div>  
                }
        </>
    )
}