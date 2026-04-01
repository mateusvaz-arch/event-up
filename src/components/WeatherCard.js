export default function WeatherCard({ city, weather, loading, error }) {
  return (
    <div className="panel">
      <h3 style={{ marginTop: 0 }}>Clima do Evento</h3>
      <p style={{ marginTop: 0, color: "rgba(255,255,255,0.65)" }}>
        Local: <strong>{city}</strong>
      </p>

      {loading && <p>Carregando clima...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}

      {!loading && !error && weather && (
        <div className="event-meta" style={{ marginTop: "0.5rem" }}>
          <span className="badge primary"> {weather.temp}°C</span>
          <span className="badge"> {weather.wind} km/h</span>
        </div>
      )}
    </div>
  );
}
