import { Link, useLocation } from "react-router-dom";
import { logo_header } from "../assets";
import styles from "../styles/components/header.module.scss";

export const Header = () => {
  const location = useLocation();

  const getNavClass = (path) => {
    return location.pathname === path
      ? `${styles["nav-item"]} ${styles["current"]}`
      : styles["nav-item"];
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <Link to="/home" className={styles.logo}>
          <img src={logo_header} />
        </Link>
        <div className={styles.nav}>
          <Link to="/home" className={getNavClass("/home")}>
            Home
          </Link>
          <Link to="/report" className={getNavClass("/report")}>
            Report
          </Link>
          <Link to="/quiz" className={getNavClass("/quiz")}>
            Quiz
          </Link>
          <Link to="/game" className={getNavClass("/game")}>
            Game
          </Link>
        </div>
      </div>
    </div>
  );
};
