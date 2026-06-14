export default {
  async fetch(request) {
    try {
      const response = await fetch(
        "https://vaccie.pythonanywhere.com/mmr/VIT%20nykotain/BARK/eu"
      );

      const text = await response.text();

      let result = text
        .replace("(🛡️ 0)", "")
        .replace(/\((\d+)\)/, "(+$1)")
        .replace(", RR: ", " | ")
        .replace(/(\| \d+)/, "$1 RR");

      return new Response(result.trim());
    } catch (err) {
      return new Response("Erreur Valorant");
    }
  },
};
