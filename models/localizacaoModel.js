const db = require("../db/connection");

function getLocalizacoes() {
    return new Promise((resolve, reject) => {
        db.all("SELECT id, nome FROM localizacao ORDER BY id", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    getLocalizacoes,
}