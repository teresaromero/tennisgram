import { writeFile, readFile } from 'fs/promises'
import { Match } from './interfaces'

const filepathData = `${process.cwd()}/src/storage/matches/jsonData.json`


// readAllMatches reads the json file and returns all stored
const readAllMatches = async (): Promise<Match[]> => {
    const content = await readFile(filepathData, { encoding: "utf-8" })
    return JSON.parse(content) as Match[]
}

// CreateMatch add a new match to the database
export const CreateMatch = async (match: Partial<Match>): Promise<void> => {
    const all = await readAllMatches()
    const newData = [match, ...all]

    await writeFile(filepathData, JSON.stringify(newData))
}

// UpdateMatch looks for the UID of the given match and replace all the object
export const UpdateMatch = async (match: Match): Promise<void> => {
    const all = await readAllMatches()
    const idx = all.findIndex(m => m.UID === match.UID)
    if (idx != -1) {
        all[idx] = match
    }

    await writeFile(filepathData, JSON.stringify(all))
}

// ReadMatchByUID returns the match with the given UID
export const ReadMatchByUID = async (UID: string): Promise<Match> => {
    const all = await readAllMatches()
    return all.find(m => m.UID === UID)
}

// ReadMatchesByUser returns a list of matches created by the given userID
export const ReadMatchesByUser = async (userID: number): Promise<Match[]> => {
    const all = await readAllMatches()
    return all.filter(m => m.meta.createdBy.id === userID)
}

// ReadMatchesPedingToResolve returns a list of matches pending to be completed to set for the given chatID
export const ReadMatchesPedingToResolve = async (chatID: number): Promise<Match> | undefined => {
    const all = await readAllMatches()
    return all.find(m => (!m.meta.created && m.meta.chatID === chatID))
}

// ReadAvailableMatches returns a list of matches with seats available
export const ReadAvailableMatches = async (): Promise<Match[]> => {
    const all = await readAllMatches()
    return all.filter(m => m.seats > m.players.length)
}

// DeleteMatchByUID: not yet implemented
export const DeleteMatchByUID = async (_: string): Promise<void> => { }









