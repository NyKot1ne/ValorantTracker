import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/rank", async (req, res) => {
  const name = "LABETEDEFOIRE";
  const tag = "BTW";
  const region = "eu";

  try {
    const response = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`);
    const data = await response.json();

    const rank = data.data.current_data.currenttierpatched;
    const rr = data.data.current_data.ranking_in_tier;
    const peak = data.data.highest_rank.patched_tier;
    res.send(`LA BETE DE FOIRE est actuellement ${rank} avec ${rr} RR | Peak : ${peak}`);
  } catch (e) {
    res.send("Impossible de récupérer le rang actuellement.");
  }
});

app.listen(3000, () => console.log("Ready on port 3000"));
