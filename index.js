export default {
  async fetch(request) {
    try {
      const response = await fetch(
        "https://api.henrikdev.xyz/valorant/v1/mmr/eu/VIT%20nykotain/BARK"
      );

      const data = await response.json();

      const rank = data.data.currenttierpatched;
      const rr = data.data.ranking_in_tier;
      const lastRR = data.data.mmr_change_to_last_game;

      const gain = lastRR > 0 ? `+${lastRR}` : `${lastRR}`;

      return new Response(
        `🏆 ${rank} | ${rr} RR | Dernière game : ${gain} RR`
      );
    } catch (err) {
      return new Response(
        "Impossible de récupérer le rank.",
        { status: 500 }
      );
    }
  },
};
