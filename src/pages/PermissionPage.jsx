import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { EyesLayout } from '../components/EyesLayout';
import styles from '../styles/pages/Permission.module.scss';
import quizStyles from '../styles/pages/QuizHome.module.scss';
import { quiz } from '../assets';
import { usePostStore } from '../store/usePostStore';
import CameraCapture from './CameraCapture';

export const QuizHomePage = () => {
  const [isCaptureDone, setIsCaptureDone] = useState(false);
  const setImages = usePostStore((state) => state.setImages);

  useEffect(() => {
    setImages([]);
  }, []);

  if (isCaptureDone) {
    return (
      <EyesLayout>
        <div className={quizStyles.quizIntroBox}>
          <p className={quizStyles.quizLine1}>
            화면을 보고 간단한 퀴즈를 풀고 있어주세요.
          </p>
          <p className={quizStyles.quizLine2}>깜빡이가 눈 분석을 하고있어요!</p>
          <div
            className={quizStyles.quizButton}
            onClick={() => setIsCaptureDone(false)}
          >
            <img src={quiz} alt="퀴즈 아이콘" />
            퀴즈
          </div>
        </div>
      </EyesLayout>
    );
  }

  return (
    <div className={styles.container}>
      <Header isHome={true} />
      <CameraCapture setIsCaptureDone={setIsCaptureDone} />
    </div>
  );
};
