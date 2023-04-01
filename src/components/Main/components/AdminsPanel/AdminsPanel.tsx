import styles from './AdminPanel.module.scss';
import {useQuery} from '@tanstack/react-query'
import { getGameinfo, setNextLayer } from "api/adminsPanel/adminPanels";
import { Box, CircularProgress, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import Team from '../Team/Team';
import { useState } from 'react';

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
    const [openInfo, setOpenInfo] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [disabled, setDisabled] = useState(false)
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
    data.playersList.forEach((item: any) => {
        if (item.teamId === 1) teamOne.push(item)
        else { teamTwo.push(item)}
    })   

    const squadsInfoTeamOne: TSquad[] = [];
    const constSquadInfoTeamTwo: TSquad[] = [];
    data.squadsList.forEach((item: any) => {
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

    return (
        <>
            <header className={styles.headerMainInfo}>
                <h4 className={styles.title}>Текущая карта: <span className={styles.subtitle}>{data.layer}</span></h4>
                <h4 className={styles.title}>Следующая карта: <span className={styles.subtitle}>{data.nextLayer}</span><Select disabled={disabled} disableUnderline={true} className={styles.selectMap} size='small' sx={{':before': {
              borderBottom: 'none'
            }, ':hover': {borderBottom: 'none'}}} value='' onChange={handleChangeLayer} variant='standard' >
                    {maps.map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                 </Select></h4>
                <h4 className={styles.title}>Игроков на сервере: <span className={styles.subtitle}>{data.playersList.length}</span></h4>
            </header>
            <main className={styles.main }>
                <Team team={teamOne} teamName={data.teams[0].name } squadList={squadsInfoTeamOne}/>
                <Team team={teamTwo} teamName={data.teams[1].name } squadList={constSquadInfoTeamTwo} />                 
            </main>
            <Snackbar
                open={openInfo}
                autoHideDuration={2000}
                onClose={handleCloseInfo}
                message={apiMessage}
                security='info'                                
            />
        </>
        
    )
}

export default AdminsPanel;