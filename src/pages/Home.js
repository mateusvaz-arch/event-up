import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../services/weather";

export default function Home() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Feira Comunitária",
      date: "20/03/2026",
      location: "São Paulo",
      lat: -23.5505,
      lon: -46.6333,
      isFree: true,
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      title: "Workshop React",
      date: "28/03/2026",
      location: "Rio de Janeiro",
      lat: -22.9068,
      lon: -43.1729,
      isFree: false,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
    },
  ]);
  const [selectedEventId, setSelectedEventId] = useState(1);
  const [filterLocation, setFilterLocation] = useState("todos");

  const [showDeleteId, setShowDeleteId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Carregar eventos criados pelo usuário no localStorage
    const userEvents = JSON.parse(localStorage.getItem("user_events") || "[]");

    // Mesclar os eventos fixos com os do usuário
    setEvents((prev) => {
      const allEvents = [...prev, ...userEvents];
      // Evitar duplicados comparando IDs 
      const uniqueEvents = allEvents.filter(
        (event, index, self) =>
          index === self.findIndex((e) => e.id === event.id),
      );
      return uniqueEvents;
    });
  }, []);

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId),
    [events, selectedEventId],
  );

  const filteredEvents = useMemo(() => {
    if (filterLocation === "todos") return events;
    return events.filter((e) => e.location === filterLocation);
  }, [events, filterLocation]);

  const uniqueLocations = useMemo(() => {
    const locations = events.map((e) => e.location);
    return ["todos", ...new Set(locations)];
  }, [events]);

  useEffect(() => {
    async function load() {
      if (!selectedEvent) return;

      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const data = await getWeather(selectedEvent.lat, selectedEvent.lon);
        const current = data?.current;

        setWeather({
          temp: current?.temperature_2m,
          wind: current?.wind_speed_10m,
        });
      } catch (e) {
        setError("Não foi possível carregar o clima agora.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    selectedEvent?.lat,
    selectedEvent?.lon,
    selectedEvent?.id,
    selectedEvent,
  ]);

  return (
    <div className="container">
      <h1 className="page-title">Eventos Disponíveis</h1>
      <p className="page-subtitle">
        Selecione um evento para ver o clima (API pública).
      </p>

      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      {loading && events.length === 0 ? (
        <p>Carregando eventos...</p>
      ) : events.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
        <>
          {/* Filtros e previsão do tempo */}
          <div className="panel" style={{ marginBottom: "1rem" }}>
            <div className="row two">
              <div>
                <label>Filtrar por Localidade</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  {uniqueLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Previsão do Tempo para:</label>
                <select
                  value={selectedEventId ?? ""}
                  onChange={(e) => setSelectedEventId(Number(e.target.value))}
                >
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title} — {e.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ height: "1.2rem" }} />

            <WeatherCard
              city={selectedEvent?.location ?? "—"}
              weather={weather}
              loading={loading && !!selectedEvent}
              error={error}
            />
          </div>

          {/* Eventos */}
          <div className="grid">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                style={{ position: "relative" }}
                onContextMenu={(e) => {
                  if (String(event.id).length > 10) {
                    e.preventDefault();
                    setShowDeleteId(
                      showDeleteId === event.id ? null : event.id,
                    );
                  }
                }}
              >
                {/* excluir evento criado pelo usuário */}
                <EventCard event={event} />
                {showDeleteId === event.id && (
                  <button
                    onClick={() => {
                      const userEvents = JSON.parse(
                        localStorage.getItem("user_events") || "[]",
                      );
                      const filtered = userEvents.filter(
                        (e) => e.id !== event.id,
                      );
                      localStorage.setItem(
                        "user_events",
                        JSON.stringify(filtered),
                      );
                      window.location.reload();
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(239, 68, 68, 0.95)",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      zIndex: 100,
                      fontWeight: "bold",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Excluir Evento
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
