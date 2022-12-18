// Match represents a match created by a player
export interface Match {
    UID: string
    meta: Meta
    notes: string | undefined
    date: number | undefined
    location: string | undefined
    seats: number | undefined
    players: Player[] | undefined
}

// User represents the person iteracting with the bot
export interface User {
    id: number
    name: string
}

// Player represents the participants of a match
export interface Player extends User { }

interface Meta {
    chatID: number
    createdAt: number
    createdBy: User
    created: boolean | undefined
}
