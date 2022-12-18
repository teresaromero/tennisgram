import { writeFile, readFile } from 'fs/promises'
import { Match } from './interfaces'

const filepathData = `${process.cwd()}/src/storage/jsonData.json`

const getAllMatches = async (): Promise<Match[]> => {
    const content = await readFile(filepathData, { encoding: "utf-8" })
    return JSON.parse(content) as Match[]
}

export const saveMatch = async (match: Partial<Match>): Promise<void> => {
    const all = await getAllMatches()
    const newData = [match, ...all]

    await writeFile(filepathData, JSON.stringify(newData))
}

export const updateMatch = async (match: Match): Promise<void> => {
    const all = await getAllMatches()
    const idx = all.findIndex(m => m.UID === match.UID)
    if (idx != -1) {
        all[idx] = match
    }

    await writeFile(filepathData, JSON.stringify(all))
}

export const getMatchesByCreator = async (creatorID: number): Promise<Match[]> => {
    const all = await getAllMatches()
    return all.filter(m => m.createdBy.id === creatorID)
}

export const getMatchByID = async (id: string): Promise<Match> | undefined => {
    const all = await getAllMatches()
    return all.find(m => m.UID === id)
}

export const getPendingMatchFromChat = async (chatID: number): Promise<Match> | undefined => { 
    const all = await getAllMatches()
    return all.find(m=>(!m.created && m.chatID === chatID))
}

