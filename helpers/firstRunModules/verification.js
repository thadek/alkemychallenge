require('dotenv').config();
module.exports = {
verifyDotEnvContent(){
        console.log("Verifying DotEnvFile");
        const msg = "firstRunError --> VERIFYING DOTENV FILE --> YOU JUST NOT PROVIDED THE"
        if(!process.env.DB_USER){
            throw new Error(` ${msg} DB_USER FIELD.`)
        }else if(!process.env.DB_PASS){
             throw new Error(`${msg} DB_PASS FIELD`)
        }else if(!process.env.DB_HOST){
            throw  new Error(`${msg} DB_HOST FIELD`)
        }else if(!process.env.DB_DIALECT){
            throw  new Error(`${msg} DB_DIALECT FIELD`)
        }else if(!process.env.AUTH_SECRET){
            throw  new Error(`${msg} AUTH_SECRET FIELD`)
        }else if(!process.env.AUTH_EXPIRES){
            throw  new Error(`${msg} AUTH_EXPIRES FIELD`)
        }else if(!process.env.AUTH_ROUNDS){
            throw  new Error(`${msg} AUTH_ROUNDS FIELD`)
        }else if(!process.env.SENDGRID_KEY){
            throw  new Error(`${msg} SENDGRID_KEY FIELD`)
        }else if(!process.env.SENDGRID_EMAIL_SENDER){
            throw  new Error(`${msg} SENDGRID_EMAIL_SENDER FIELD`)
        }else if(!process.env.DB_NAME){
           console.log('\x1b[33m%s\x1b[0m',(`Warning: ${msg} DB_NAME FIELD`))}

    }
}