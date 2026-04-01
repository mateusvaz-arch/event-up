import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1 className="page-title">Meus Eventos Salvos</h1>
      <p className="page-subtitle">
        Acompanhe os eventos que você demonstrou interesse.
      </p>

      {favorites.length === 0 ? (
        <p>Você ainda não salvou nenhum evento.</p>
      ) : (
        <div className="events-grid">
          {favorites.map((event) => (
            <div key={event.id} className="favorite-item">
              <EventCard event={event} />
              <button
                className="btn danger"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  background: "var(--danger)",
                }}
                onClick={() => removeFavorite(event.id)}
              >
                Remover dos Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
