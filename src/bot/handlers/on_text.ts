import { Context } from "grammy"

export const onText = async (ctx: Context) => {
    console.log("holi")
    
    if (ctx.from.is_bot || ctx.from.first_name == "") {
        return
    }

    await ctx.reply(
        `Hola ${ctx.from.first_name}`,
        {
            reply_to_message_id: ctx.msg.message_id,
        }
    )
}