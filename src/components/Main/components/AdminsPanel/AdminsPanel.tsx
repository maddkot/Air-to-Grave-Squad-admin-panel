import styles from './AdminPanel.module.scss';
import {useQuery} from '@tanstack/react-query'
import { chageMapApi, getGameinfo, setNextLayer } from "api/adminsPanel/adminPanels";
import { Autocomplete, Box,  CircularProgress, Drawer, IconButton, Snackbar, TextField } from "@mui/material";
import Team from '../Team/Team';
import { useState } from 'react';

import { TMainDataTypes, TPlayer, TSquad } from 'types/mainTypes';
import { LeftMainContainer } from '../LeftMainContainer/LeftMainContainer';
import { maps, seedMaps } from 'constants/maps';
import { RightMainComponent } from '../RightMainComponent/RightMainComponent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { adminsList } from 'constants/admins';

    
const AdminsPanel = () => {

    const playersRoles = JSON.parse(localStorage.getItem('userData') || '{}');
    const accessRoles = playersRoles.roles.includes('ADMIN');
    const [openInfo, setOpenInfo] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [mapManage , setMapManage] = useState(false)
    const [value, setValue] = useState<string | null>(null);
    const [value2, setValue2] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const { isLoading, error, data } = useQuery<TMainDataTypes>({
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

    
       
    const handleChangeLayer = (/* event: SelectChangeEvent */value: string | null) => {        
        if(value !== null) nextLayer(value);
    };

    const handleChangeMap = (/* event: SelectChangeEvent */value: string | null) => {        
        if(value !== null) changeMap(value);
    };
      
    const teamOne: TPlayer[] = [];
    const teamTwo: TPlayer[] = [];
    let adminsCount: number = 0;
    const squadsInfoTeamOne: TSquad[] = [];
    const constSquadInfoTeamTwo: TSquad[] = [];
    if (data) {
        data.gameInfo.playersList.forEach((item: any) => {
            if (adminsList.includes(item.steamId)) { adminsCount++ }
        if (item.teamId === 1) teamOne.push(item)
        else { teamTwo.push(item)}
    })   

   
    data.gameInfo.squadsList.forEach((item: TSquad) => {        
        if (item.teamId === 1) squadsInfoTeamOne.push(item)
        else { constSquadInfoTeamTwo.push(item)}
    }) 
    }
   

    const nextLayer = async (layer: string) => {
        try {
            setDisabled(true)
            const res = await setNextLayer(layer)
            setMapManage(false);
            openMesageInfo(res.payload)            
            setDisabled(false);
            setInputValue('')
            setValue(null)
            return res;
        } catch (error) {
            console.log(error)
            // openMesageInfo(error)
        }

    }
    
    const changeMap = async (layer: string) => {
        try {
            setDisabled(true)
            const res = await chageMapApi(layer)
            setMapManage(false);
            openMesageInfo(res.payload)            
            setDisabled(false);
            setInputValue2('')
            setValue2(null)
            return;
        } catch (error) {
            console.log(error)
            // openMesageInfo(error.error)
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
    console.log(adminsCount)
    if (!data) return null;
    const selectMaps = data?.gameInfo.playersList.length > 20 ? maps : seedMaps
    const disabledSleectMap = data?.gameInfo.playersList.length > 20 ? !accessRoles : false
    return (
        <>
            <header className={styles.headerMainInfo}>
                <h4 className={styles.title}>Текущая карта: <span className={styles.subtitle}>{data.gameInfo.layer}</span></h4>
                <h4 className={styles.title}>Следующая карта: 
                    <span className={styles.subtitle}> {data.gameInfo.nextLayer}</span>
                    <IconButton size="small" onClick={() => setMapManage(!mapManage)}>
                        {mapManage === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                    {/* {accessRoles &&
                        } */}
                </h4>
                <h4 className={styles.title}>Игроков на сервере: <span className={styles.subtitle}>{data.gameInfo.playersList.length}</span> Админов: <span className={styles.subtitle}>{adminsCount}</span></h4>
            </header>
            <main className={styles.main}>                
                <LeftMainContainer data={data}/>
                <div className={styles.teamContainer}>
                    <Team team={teamOne} teamName={data.gameInfo.teams[0].name } squadList={squadsInfoTeamOne}/>
                    <Team team={teamTwo} teamName={data.gameInfo.teams[1].name } squadList={constSquadInfoTeamTwo} />
                </div>                
                <RightMainComponent data={data}/>               
            </main>
            <Snackbar
                open={openInfo}
                autoHideDuration={2000}
                onClose={handleCloseInfo}
                message={apiMessage}
                security='info'                                
            />
            {<Drawer
                anchor='bottom'
                open={mapManage}
                onClose={() => {
                    setMapManage(false)
                    setInputValue('')
                    setValue(null)
                }}
                
            >
                <div style={{marginTop: '20px', marginBottom: "20px"}}>
                <Autocomplete
                    disabled={!accessRoles||disabled }        
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                        setValue(newValue);
                        handleChangeLayer(newValue)
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={maps}
                    sx={{ width: 300, margin: '10px auto ' }}
                    renderInput={(params) => <TextField {...params} label="Сменить следующую карту" />}
                />
                <Autocomplete
                    disabled={disabledSleectMap||disabled}    
                    value={value2}
                    onChange={(event: any, newValue: string | null) => {
                        setValue2(newValue);
                        handleChangeMap(newValue)
                    }}
                    inputValue={inputValue2}
                    onInputChange={(event, newInputValue) => {
                        setInputValue2(newInputValue);
                    }}
                    id="controllable-states-demo"
                    
                    options={selectMaps}
                    sx={{ width: 300, margin: 'auto' }}
                    renderInput={(params) => <TextField {...params} label="Сменить карту (заканчивает раунд)" />}
                />
                </div>
            </Drawer>}            
        </>
        
    )
}

export default AdminsPanel;