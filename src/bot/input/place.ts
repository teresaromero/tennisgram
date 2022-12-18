import { Context } from "grammy"

const placeReplyText = "¿Donde va a ser el partido?"

export const AskForPlace = async (ctx: Context) => ctx.reply(placeReplyText)
