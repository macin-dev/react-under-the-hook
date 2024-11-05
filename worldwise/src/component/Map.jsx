import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesProvider";

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  // const navigate = useNavigate();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <>
      <div className={styles.mapContainer}>
        <MapContainer
          center={currentPosition}
          zoom={13}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {cities.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.country}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
