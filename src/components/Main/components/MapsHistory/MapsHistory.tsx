import { TLayerHistoryItem } from 'types/mainTypes';
import styles from './MapsHistory.module.scss';
type TMapsHistory = {
    layerHistory: TLayerHistoryItem[]
}

export const MapsHistory = ({ layerHistory }:TMapsHistory) => {    
    return (
        <>
            <h3 className={styles.mapsHistoryTitle}>История карт:</h3>
            <div className={styles.mapsHistoryContainer}>
            {layerHistory.map((item: TLayerHistoryItem) => {
                                    const startDate = new Date(item.startDate).toLocaleString()
                return (
                    <div className={styles.mapItem} key={item.startDate + Math.random()} >
                        <h4 className={styles.disconnectedPlayersTitle}>{item.layerName}</h4>
                        <span>{startDate}</span>
                    </div>
                        )})}
            </div>
        </>
    )
}