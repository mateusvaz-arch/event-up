import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("São Paulo");
  const [isFree, setIsFree] = useState(true);
  const [image, setImage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera: ", err);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
      setShowCamera(false);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoData = canvas.toDataURL("image/jpeg");
      setImage(photoData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setShowCamera(false);
  };

  // Cidades pré-definidas com coordenadas para a API de clima
  const availableCities = [
    { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
    { name: "Belo Horizonte", lat: -19.9167, lon: -43.9345 },
    { name: "Curitiba", lat: -25.4284, lon: -49.2733 },
    { name: "Salvador", lat: -12.9714, lon: -38.5014 },
    { name: "Fortaleza", lat: -3.7172, lon: -38.5283 },
    { name: "Porto Alegre", lat: -30.0346, lon: -51.2177 },
    { name: "Brasília", lat: -15.7801, lon: -47.9292 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const cityData = availableCities.find((c) => c.name === selectedLocation);

    const newEvent = {
      id: Date.now(),
      title,
      date,
      location: selectedLocation,
      isFree,
      image:
        image ||
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=400",
      lat: cityData?.lat || -23.5505,
      lon: cityData?.lon || -46.6333,
    };

    // Pega eventos já criados no localStorage
    const savedEvents = JSON.parse(localStorage.getItem("user_events") || "[]");
    localStorage.setItem(
      "user_events",
      JSON.stringify([...savedEvents, newEvent]),
    );

    alert("Evento criado com sucesso!");
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="page-title">Criar Novo Evento</h1>
      <p className="page-subtitle">
        Preencha os dados abaixo para publicar seu evento.
      </p>

      <div className="panel" style={{ maxWidth: "600px" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label>Título do Evento</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Workshop de React"
            />
          </div>

          <div className="row two">
            <div>
              <label>Data</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label>Localização (Cidade)</label>
              <select
                required
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {availableCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>URL da Imagem (Opcional)</label>
            <div
              style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}
            >
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn secondary"
                onClick={startCamera}
                title="Tirar foto com a câmera"
              >
                📸 Foto
              </button>
            </div>

            {showCamera && (
              <div
                className="camera-overlay"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "black",
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  style={{
                    width: "100%",
                    maxWidth: "800px",
                    borderRadius: "8px",
                  }}
                />
                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                >
                  <button
                    type="button"
                    className="btn primary"
                    onClick={takePhoto}
                  >
                    Capturar
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={stopCamera}
                  >
                    Cancelar
                  </button>
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}

            {image && image.startsWith("data:image") && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={image}
                  alt="Preview do evento"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              id="isFree"
            />
            <label htmlFor="isFree" style={{ margin: 0 }}>
              Evento Gratuito?
            </label>
          </div>

          <button
            type="submit"
            className="btn primary"
            style={{ marginTop: "1rem" }}
          >
            Publicar Evento
          </button>
        </form>
      </div>
    </div>
  );
}
