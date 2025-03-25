import {config} from "dotenv";

config({path : `./env.${process.env.NODE_ENV || 'development'}.local`});

export const {PORT , IP_ADDRESS} = process.env ;
export const {env} = process.env;
