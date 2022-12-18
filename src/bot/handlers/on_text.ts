import { Context } from "grammy"
import { ReadMatchesPedingToResolve, UpdateMatch } from "../../storage/matches/crud"

export const OnTextHandler = async (ctx: Context) => {
    const pendingMatch = await ReadMatchesPedingToResolve(ctx.chat.id)
    if (!pendingMatch) {
        await ctx.reply("No tienes nada pendiente. Inicia un nuevo registro usando el comando partido")
        return
    }
    const text = ctx.message.text
    if (text === "finalizar") {
        pendingMatch.meta.created = true
    } else {
        pendingMatch.meta.created = true
        pendingMatch.notes = text
    }

    await UpdateMatch(pendingMatch)
    const msg = `Perfecto! hemos terminado, aqui te dejo un resumen del partido:
- Dia: ${pendingMatch.date}\n- Lugar: ${pendingMatch.location || ""}
- Jugadores: ${pendingMatch.players.map(p => p.name).join(",")}
- Plazas disponibles: ${pendingMatch.seats - 1}
- Notas: ${pendingMatch.notes || ""}`
    await ctx.reply(msg)
}