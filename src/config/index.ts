import { config as loadEnvs } from 'dotenv'

loadEnvs()

interface Config {
    TELEGRAM_API_KEY: string;
}

const config: Config = {
    TELEGRAM_API_KEY: process.env.TELEGRAM_API_KEY || "",
}

export default config