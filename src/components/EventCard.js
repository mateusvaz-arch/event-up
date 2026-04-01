import { useState } from "react";

export default function EventCard({ event }) {
  const [swipeClass, setSwipeClass] = useState("");
  let touchStartX = 0;

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.some((f) => f.id === event.id)) {
      favorites.push(event);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Evento adicionado aos favoritos!");
    } else {
      alert("Este evento já está nos favoritos.");
    }
  };

  const handleTouchStart = (e) => {
    touchStartX = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.targetTouches[0].clientX;
    const diff = touchEndX - touchStartX;

    if (diff > 50) setSwipeClass("swiping-right");
    else if (diff < -50) setSwipeClass("swiping-left");
    else setSwipeClass("");
  };

  const handleTouchEnd = () => {
    if (swipeClass === "swiping-right") {
      handleFavorite();
    }
    setSwipeClass("");
  };

  return (
    <div
      className={`event-card ${swipeClass}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {event.image && (
        <img src={event.image} alt={event.title} className="event-image" />
      )}
      <div className="card-body">
        <h3>{event.title}</h3>

        <div className="event-meta">
          <span className="badge primary">📅 {event.date}</span>
          <span className="badge">📍 {event.location}</span>
          <span className={`badge ${event.isFree ? "success" : ""}`}>
            {event.isFree ? "Gratuito" : "Pago"}
          </span>
        </div>

        <div className="spacer" />
        <div className="card-actions">
          <button className="btn primary">Ver detalhes</button>
          <button className="btn secondary" onClick={handleFavorite}>
            ❤️ Favoritar
          </button>
        </div>
      </div>
    </div>
  );
}
