
export interface Match {
    UID: string
    chatID: number
    created: boolean | undefined
    notes: string | undefined
    date: number | undefined
    location: string | undefined
    createdAt: number
    createdBy: Player
    seats: number | undefined
    players: Player[] | undefined
}

export interface Player {
    id: number
    name: string
}

