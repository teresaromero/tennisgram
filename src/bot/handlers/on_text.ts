import { Context } from "grammy"
import { ReadMatchesPedingToResolve, UpdateMatch } from "../../storage/matches/crud"
import { AskForNotes } from "../input/notes"

export const OnTextHandler = async (ctx: Context) => {
    const pendingMatch = await ReadMatchesPedingToResolve(ctx.chat.id)
    if (!pendingMatch) {
        await ctx.reply("No tienes nada pendiente. Inicia un nuevo registro usando el comando partido")
        return
    }
    const text = ctx.message.text
    if (text === "finalizar") {
        if (pendingMatch.place) {
            pendingMatch.meta.created = true
        } else {
            await ctx.reply("Ooops.... me falta saber donde quieres jugar el partido")
            return
        }
    } else if (!pendingMatch.place) {
        pendingMatch.place = text
        await UpdateMatch(pendingMatch)
        await AskForNotes(ctx)
        return
    } else {
        pendingMatch.notes = text
        pendingMatch.meta.created = true
    }

    await UpdateMatch(pendingMatch)
    const msg = `Perfecto! hemos terminado, aqui te dejo un resumen del partido:
- Dia: ${pendingMatch.date}\n- Lugar: ${pendingMatch.place || ""}
- Jugadores: ${pendingMatch.players.map(p => p.name).join(",")}
- Plazas disponibles: ${pendingMatch.seats - 1}
- Notas: ${pendingMatch.notes || ""}`
    await ctx.reply(msg)
}