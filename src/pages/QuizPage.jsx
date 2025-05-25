import { Header } from '../components/Header';
import styles from '../styles/pages/Quiz.module.scss';

export const QuizPage = () => {
  return (
    <div className={styles.container}>
      <Header isHome={true} />
    </div>
  );
};
