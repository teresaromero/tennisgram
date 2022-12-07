import * as dotenv from 'dotenv'
dotenv.config()

interface Config {
    TELEGRAM_API_KEY: string;
}

function newConfig(): Config {
    return {
        TELEGRAM_API_KEY: process.env.TELEGRAM_API_KEY || ""
    }
}

export default newConfig()