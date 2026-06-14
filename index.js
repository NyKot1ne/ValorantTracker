const express = require("express");
const app = express();

app.get("/valorant", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.henrikdev.xyz/valorant/v1/mmr/eu/VIT%20nykotain/BARK"
        );

        const data = await response.json();

        const rank = data.data.currenttierpatched;
        const rr = data.data.ranking_in_tier;
        const lastRR = data.data.mmr_change_to_last_game;

        let gain = lastRR > 0 ? `+${lastRR}` : `${lastRR}`;

        res.send(`🏆 ${rank} | ${rr} RR | Dernière game : ${gain} RR`);
    } catch (err) {
        res.send("Impossible de récupérer le rank.");
    }
});

app.listen(process.env.PORT || 3000);
