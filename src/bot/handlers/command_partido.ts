import { Context } from "grammy";
import { CreateMatch } from "../../storage/matches/crud";
import { Match, Player } from "../../storage/matches/interfaces";
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
        players: [user],
        meta: {
            createdAt: Date.now(),
            chatID: ctx.chat.id,
            createdBy: user,
            created: false
        }
    }
    await CreateMatch(match)
    await AskForSchedule(ctx, matchID)
}