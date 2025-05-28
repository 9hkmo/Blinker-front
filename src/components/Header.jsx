import { Link, useLocation } from 'react-router-dom';
import { logo_header } from '../assets';
import styles from '../styles/components/header.module.scss';

export const Header = () => {
  const location = useLocation();

  const getNavClass = (path) => {
    return location.pathname === path
      ? `${styles['nav-item']} ${styles['current']}`
      : styles['nav-item'];
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <Link to="/" className={styles.logo}>
          <img src={logo_header} />
        </Link>
        <div className={styles.nav}>
          <Link to="/" className={getNavClass("/")}>
            Home
          </Link>
          <Link to="/test" className={getNavClass("/test")}>
            Test
          </Link>
          <Link to="/quiz" className={getNavClass('/quiz')}>
            Quiz
          </Link>
          <Link to="/game" className={getNavClass('/game')}>
            Game
          </Link>
        </div>
      </div>
    </div>
  );
};
