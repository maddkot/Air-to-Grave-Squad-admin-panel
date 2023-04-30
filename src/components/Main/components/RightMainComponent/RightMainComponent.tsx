import { TMainDataTypes } from 'types/mainTypes';
import styles from './RightMainComponent.module.scss';
import { MapsHistory } from '../MapsHistory/MapsHistory';

export const RightMainComponent = ({ data }: { data: TMainDataTypes }) => {
    const { layerHistory} = data;
    return (
        <div className={styles.container}>
            <MapsHistory layerHistory={ layerHistory} />
        </div>
    )
}