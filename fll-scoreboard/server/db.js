const Database = require("better-sqlite3");

const db = new Database("data/scoreboard.db");

function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      teamNumber INTEGER,
      name TEXT
    );

    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      teamId TEXT,
      score INTEGER,
      round INTEGER,
      timestamp INTEGER
    );
  `);
}

module.exports = { db, initDB };