import { Context } from "grammy";
import { saveMatch } from "../../storage";
import { Match, Player } from "../../storage/interfaces";
import { AskForSchedule } from "../input/schedule";

export const PartidoCommandKeyword = "partido"
export const PartidoCommandDescription = "Crea un nuevo partido"

export const PartidoCommandHandler = async (ctx: Context) => {
    const user: Player = {
        id: ctx.from.id,
        name: ctx.from.first_name
    }
    const matchID = `${user.id}${ctx.message.message_id}`
    const match: Partial<Match> = {
        UID: matchID,
        createdAt: Date.now(),
        createdBy: user,
        chatID: ctx.chat.id,
        players: [user]
        
    }
    await saveMatch(match)
    await AskForSchedule(ctx, matchID)
}