import styles from '../styles/pages/Home.module.scss';
import { test, minigame } from '../assets';
import { Link } from 'react-router-dom';
import { EyesLayout } from '../components/EyesLayout';

export const HomePage = () => {
  return (
    <EyesLayout>
      <div className={styles.text}>내 눈 건강 지킴이, 블링커</div>
      <div className={styles.buttonWrapper}>
        <Link to="/test" className={styles.startButton}>
          <img src={test} alt="검사 시작 아이콘" />
          검사 시작
        </Link>
        <Link to="/game" state={{ home: false }} className={styles.gameButton}>
          <img src={minigame} alt="미니게임 아이콘" />
          미니 게임
        </Link>
      </div>
    </EyesLayout>
  );
};
