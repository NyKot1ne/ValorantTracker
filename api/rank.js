export default async function handler(req, res) {
  const name = "LABETEDEFOIRE";
  const tag = "BTW";
  const region = "eu";

  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}`,
      {
        headers: {
          Authorization: "none",
        },
      }
    );

    if (!response.ok) {
      return res.status(404).send("Impossible de récupérer le rang.");
    }

    const data = await response.json();

    const current = data.data.current_data;
    const highest = data.data.highest_rank;

    if (!current) {
      return res.status(404).send("Aucune donnée disponible.");
    }

    const rank = current.currenttierpatched || "Non classé";
    const rr = current.ranking_in_tier ?? 0;
    const peak = highest?.patched_tier || "Aucun peak";

    res.status(200).send(`LA BETE DE FOIRE est ${rank} (${rr} RR) | Peak : ${peak}`);
  } catch (error) {
    console.error("Erreur AP
