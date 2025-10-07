export default async function handler(req, res) {
  const name = "LABETEDEFOIRE";
  const tag = "BTW";
  const region = "eu";

  try {
    const response = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`);
    const data = await response.json();

    if (!data.data?.current_data) {
      return res.status(404).send("Impossible de récupérer le rang actuellement.");
    }

    const rank = data.data.current_data.currenttierpatched;
    const rr = data.data.current_data.ranking_in_tier;
    const peak = data.data.highest_rank.patched_tier;

    res.status(200).send(`LA BETE DE FOIRE est actuellement ${rank} (${rr} RR) | Peak : ${peak}`);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération du rang.");
  }
}
