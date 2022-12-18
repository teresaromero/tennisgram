import { Context } from "grammy"
import { ReadAvailableMatches } from "../../storage/matches/crud"
import { AskToEnroll } from "../input/enroll"

export const EnrollCommandKeyword = "jugar"
export const EnrollCommandDescription = "Consulta y selecciona el partido que quieres jugar"


export const EnrollCommandHandler = async (ctx: Context) => {
    const availableMatches = await ReadAvailableMatches()
    console.log(availableMatches)
    await AskToEnroll(ctx, availableMatches)
}