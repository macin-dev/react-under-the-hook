import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <>
      <div className={styles.mapContainer} onClick={() => navigate("form")}>
        {" "}
        Position: {lat}, {lng}
        <button onClick={() => setSearchParam({ lat: 254, lng: 355 })}>
          Change props
        </button>
      </div>
    </>
  );
}

export default Map;
