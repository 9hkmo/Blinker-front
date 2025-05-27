import styles from '../styles/pages/QuizHome.module.scss';
import { quiz } from '../assets';
import { Link } from 'react-router-dom';
import { EyesLayout } from '../components/EyesLayout';

export const QuizHomePage = () => {
  return (
    <EyesLayout>
      <div className={styles.quizIntroBox}>
        <p className={styles.quizLine1}>
          화면을 보고 간단한 퀴즈를 풀고 있어주세요.
        </p>
        <p className={styles.quizLine2}>깜빡이가 눈 분석을 하고있어요!</p>
        <Link to="/quiz" className={styles.quizButton}>
          <img src={quiz} alt="퀴즈 아이콘" />
          퀴즈
        </Link>
      </div>
    </EyesLayout>
  );
};
