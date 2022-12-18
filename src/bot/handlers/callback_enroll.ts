import { Context } from "grammy"
import { ReadMatchByUID, UpdateMatch } from "../../storage/matches/crud"
import { Match, Player } from "../../storage/matches/interfaces"
import { EnrollOptionPrefix } from "../input/enroll"

export const EnrollOptionCallbackRegex = new RegExp(`^${EnrollOptionPrefix}`)

export const EnrollCallbackHandler = async (ctx: Context) => {
    const data = ctx.callbackQuery.data

    // remove the keyboard from the callback query
    await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } })

    // lookup matchID and save date
    const [_, matchID] = data.split("-", 2)
    const match: Match = await ReadMatchByUID(matchID)
    if (!match) {
        await ctx.reply("Ooops... parece que el partido no existe!")
        return
    }
    const playerIndx = match.players.findIndex(p => p.id === ctx.from.id)
    if (playerIndx != -1) {
        await ctx.reply("Ooops... ya te has registrado para este partido!")
        return
    }
    const player: Player = {
        id: ctx.from.id,
        name: ctx.from.first_name
    }
    match.players.push(player)
    await UpdateMatch(match)

    const msg = `- Dia: ${match.date}\n- Lugar: ${match.place || ""}
- Jugadores: ${match.players.map(p => p.name).join(",")}
- Plazas disponibles: ${match.seats - match.players.length}
- Notas: ${match.notes || ""}`

    // send message to match creator
    await ctx.api.sendMessage(match.meta.chatID, `Partido actualizado:
${msg}`)

    // send message to thread
    await ctx.reply(`Genial! Te has apuntado al siguiente partido:
${msg}`)
}
