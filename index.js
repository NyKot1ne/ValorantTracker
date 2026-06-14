export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);

      const parts = url.pathname.split("/").filter(Boolean);

      if (parts.length < 2) {
        return new Response(
          "Utilisation : /pseudo/tag",
          { status: 400 }
        );
      }

      const pseudo = parts[0];
      const tag = parts[1];

      const response = await fetch(
        `https://vaccie.pythonanywhere.com/mmr/${encodeURIComponent(pseudo)}/${encodeURIComponent(tag)}/eu`
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
  }
};
