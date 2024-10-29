import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copyright {new Date().getFullYear()} Worldwise Inc.
        </p>
      </footer>
    </div>
  );
};

export default SideBar;
