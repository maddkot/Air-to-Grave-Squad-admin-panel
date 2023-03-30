import styles from './AdminPanel.module.scss';
import {useQuery} from '@tanstack/react-query'
import { getGameinfo } from "api/adminsPanel/adminPanels";
import { Box, CircularProgress } from "@mui/material";
import Team from '../Team/Team';

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

const AdminsPanel = () => {    
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
    
    const teamOne: TPlayer[] = [];
    const teamTwo: TPlayer[] = [];
    data.playersList.forEach((item: any) => {
        if (item.teamId === 1) teamOne.push(item)
        else { teamTwo.push(item)}
    }) 
    // console.log(data, 'data');

    const squadsInfoTeamOne: TSquad[] = [];
    const constSquadInfoTeamTwo: TSquad[] = [];
    data.squadsList.forEach((item: any) => {
        if (item.teamId === 1) squadsInfoTeamOne.push(item)
        else { constSquadInfoTeamTwo.push(item)}
    }) 

    return (
        <>
            <header className={styles.headerMainInfo}>
                <h4 className={styles.title}>Текущая карта: <span className={styles.subtitle}>{data.layer}</span></h4>
                <h4 className={styles.title}>Следующая карта: <span className={styles.subtitle}>{data.nextLayer}</span></h4>
                <h4 className={styles.title}>Игроков на сервере: <span className={styles.subtitle}>{data.playersList.length}</span></h4>
            </header>
            <main className={styles.main }>
                <Team team={teamOne} teamName={data.teams[0].name } squadList={squadsInfoTeamOne}/>
                <Team team={teamTwo} teamName={data.teams[1].name } squadList={constSquadInfoTeamTwo} />                 
            </main>
        
        </>
        
    )
}

export default AdminsPanel;