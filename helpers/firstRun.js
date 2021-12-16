const verif = require('./firstRunModules/verification')
const db = require('./firstRunModules/databaseHelpers')

console.log('\x1b[32m%s\x1b[0m', "> Alkemy Challenge - Gabriel Pamich - First Run \n")
// 1 - DotEnv Verification
verif.verifyDotEnvContent();
require('dotenv').config();
// 2a - DB Create if DB_NAME is not present (Only in the case where all of other dotenv variables are present)
if (!process.env.DB_NAME) {
    console.log("Creating Database with name alkemychallenge");
    db.createDatabase().then(created => {
        console.log(created);
        db.checkConnection()
            .then(connected => {
                console.log(connected)
                //Persist Models in DB
                db.persistModels().then(persisted => {
                    console.log(persisted)
                    db.populateDatabase().then(() => {
                        console.log('\x1b[32m%s\x1b[0m', "All ok? All ok. Finishing Execution.")
                        process.exit();
                    })
                });
            })
        

    }).catch(err => console.log(err))
} else {
//2b - DB Connection Verification
    db.checkConnection()
            .then(connected => {
                console.log(connected)
                //Persist Models in DB
                db.persistModels().then(persisted => {
                    console.log(persisted)
                    db.populateDatabase().then(() => {
                        console.log('\x1b[32m%s\x1b[0m', "All ok? All ok. Finishing Execution.")
                        process.exit();
                    })
                });
            })
}













