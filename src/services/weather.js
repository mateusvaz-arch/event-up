export async function getWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,wind_speed_10m&timezone=America/Sao_Paulo`;

// teste
  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao buscar clima");
  return res.json();
}
