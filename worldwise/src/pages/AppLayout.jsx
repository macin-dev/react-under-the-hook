import Map from "../component/Map";
import SideBar from "../component/SideBar";
import User from "../component/User";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <User />
      <SideBar />
      <Map />
    </div>
  );
};

export default AppLayout;
