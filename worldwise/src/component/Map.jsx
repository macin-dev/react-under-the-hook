import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesProvider";

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  useEffect(() => {
    if (lat && lng) setCurrentPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <>
      <div className={styles.mapContainer}>
        <MapContainer
          center={currentPosition}
          zoom={6}
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

          <ChangeMapView position={currentPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeMapView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
