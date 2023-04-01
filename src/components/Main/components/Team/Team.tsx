import { Card } from '@mui/material';
import Squads from '../Squads/Squad';
import styles from './Team.module.scss';

type TPlayer = {
    id: number,
    kit: string,
    leader: boolean,
    nickname: string,
    squadId: number,
    steamId: string,
    teamId: number,
    squadName?: string
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

type teamProps = {
    team: TPlayer[],
    teamName: string,
    squadList: TSquad[],
}



const Team = ({ team, teamName, squadList }: teamProps) => {
    const groupSquad = squadList.map((squad) => {
        const squads = team.filter((person) => person.squadId === squad.id);
        const leader = team.filter((leader) => leader.leader && leader.squadId === squad.id)
        return {...squad, players: squads, leader}
    })


    return (
        <Card className={styles.teamContainer}>
                <h2 className={styles.titleTeamName}>{teamName}</h2>
                <Squads squad={groupSquad} />                 
        </Card>
    )
}

export default Team;