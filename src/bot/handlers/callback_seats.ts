import { Context } from "grammy"
import { getMatchByID, updateMatch } from "../../storage"
import { Match } from "../../storage/interfaces"
import { AskForNotes } from "../input/notes"
import { SeatsOptionPrefix } from "../input/seats"

export const SeatsOptionCallbackRegex = new RegExp(`^${SeatsOptionPrefix}`)

export const SeatsCallbackHandler = async (ctx: Context) => {
    const data = ctx.callbackQuery.data

    // remove the keyboard from the callback query
    await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } })

    const [_, selectedSeats, matchID] = data.split("-", 3)
    const match: Match = await getMatchByID(matchID)
    if (!match) {
        // reply: Match not found
    }
    const seats = parseInt(selectedSeats)
    if (!seats || (seats != 2 && seats != 4)) {
        // reply: Invalid seat number
    }
    match.seats = seats
    await updateMatch(match)

    // edit the message to keep response
    await ctx.editMessageText(`${ctx.msg.text} \nGuardado: ${seats}`)

    await AskForNotes(ctx)
    // await AskForLocation(ctx, match.UID)
}
