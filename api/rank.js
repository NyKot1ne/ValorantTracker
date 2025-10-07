export default async function handler(req, res) {
  const name = "LABETEDEFOIRE";
  const tag = "BTW";
  const region = "eu";

  try {
    const response = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`);

    if (!response.ok) {
      return res.status(404).send("Impossible de récupérer le rang depuis l'API HenrikDev.");
    }

    const json = await response.json();
    const current = json.data?.current_data;
    const highest = json.data?.highest_rank;

    if (!current) {
      return res.status(404).send("Aucune donnée de rang disponible.");
    }

    const rank = current.currenttierpatched || "Non classé";
    const rr = current.ranking_in_tier ?? 0;
    const peak = highest?.patched_tier || "Aucun peak";

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(`Rank : ${rank} ${rr} RR | Peak : ${peak}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erreur interne : " + error.message);
  }
}
