const express = require("express");
const { db } = require("../db");
const { getRankings } = require("../ranking");

const router = express.Router();

router.post("/", (req, res) => {
  const { teamId, score, round } = req.body;

  db.prepare(`
    INSERT INTO runs (id, teamId, score, round, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    crypto.randomUUID(),
    teamId,
    score,
    round,
    Date.now()
  );

  const rankings = getRankings();

  req.app.get("io").emit("rankings:update", rankings);

  res.json({ success: true });
});

module.exports = router;