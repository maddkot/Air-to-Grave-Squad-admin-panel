export type TDisconectPlayer = {
    disconnectedTime: string,
    nickname: string,
    steamId: string
}

export type TLayerHistoryItem = {
    layerName: string,
    mapName: string,
    startDate: string
}

export type TPlayer = {
    id: number,
    kit: string,
    leader: boolean,
    nickname: string,
    squadId: number,
    steamId: string,
    teamId: number
}

export type TSquad = {
    creatorName: string,
    creatorSteamId: string,
    id: number,
    locked: boolean,
    name: string,
    size: number,
    teamId: number,
    players: TPlayer[],
    leader: TPlayer[]
}

export type TTeams = {
    id: number,
    name: string
}

export type TGameInfoItem = {
    layer: string,
    map: string,
    nextLayer: string,
    nextMap: string,
    playersList: TPlayer[],
    squadsList: TSquad[],
    teams: TTeams[]
}

export type TMainDataTypes = {
    disconnectedPlayers: TDisconectPlayer[],
    gameInfo:TGameInfoItem,
    layerHistory: TLayerHistoryItem[]
}