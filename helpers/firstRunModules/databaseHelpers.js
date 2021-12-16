const { host, port, username: user, password, database } = require('../../config/database');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = {

    async createDatabase() {
        const connection = await mysql.createConnection({ host, port, user, password });
        const res = connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`).then(() => "Database created.").catch(err => console.log(err));
        return res;
    },

    async checkConnection() {
        const { sequelize } = require('../../app/models/index');
        return sequelize.authenticate().then(() => "DB Connected.").catch(e => { console.log("Error Verifying DB Connection:", e) })
    },

    async persistModels() {
        console.log('\x1b[34m%s\x1b[0m', "Persisting Models in DB...")
        const { sequelize } = require('../../app/models/index');
        return sequelize.sync().then(() => "Models Persisted.");
    },

    async populateDatabase() {
        const { exec } = require("child_process");
        let res;
        console.log("Loading sample data on DB...");
        exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            if (stdout) {
                console.log(stdout);
            }
        });
        return new Promise(resolve=>setTimeout(resolve,5000));
    }


}