import { Context } from "grammy";

export const AskForNotes = async (ctx: Context) =>
    await ctx.reply("Añade cualquier otra información o escribe 'guardar' para finalizar")