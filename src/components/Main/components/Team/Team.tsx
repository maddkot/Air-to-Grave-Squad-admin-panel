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
    
/*     const groupSquad = team.reduce<Record<any, any>>((r, i) => {

        r[i.squadId] = r[i.squadId] || [];
        //let squadName = squadList.filter(item => item.id === i.squadId)
        //i = {...i, squadName: squadName[0].name }
        r[i.squadId].push(i);
        //console.log(r, 'r')
        return r;
    }, []) */

   // const squadParty = squadList.
    const groupSquad = squadList.map((squad) => {
        const squads = team.filter((person) => person.squadId === squad.id)
       //console.log(squads, 'squads')
        return {...squad, players: squads}
    })
    //console.log(groupSquad, 'squadList')
    // console.log(groupSquad, 'groupSquad')

    /* {groupSquad.map((item: TPlayer[], indx: React.Key ) => {
        return (
                <Squads squad={item} key={indx}/>
            )
        }
    )}  */


    return (
        <Card className={styles.teamContainer}>
                <h2 className={styles.titleTeamName}>{teamName}</h2>
                <Squads squad={groupSquad} />                 
        </Card>
    )
}

export default Team;