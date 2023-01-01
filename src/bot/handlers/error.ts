import { BotError, GrammyError, HttpError } from "grammy";

export const error = (err: BotError): void => {
    if (err instanceof GrammyError) {
        console.error("Error in request:", err.description);
    } else if (err instanceof HttpError) {
        console.error("Could not contact Telegram:", err);
    } else {
        console.error("Unknown error:", err);
    }
    throw err
}