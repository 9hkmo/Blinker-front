import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { EyesLayout } from '../components/EyesLayout';
import styles from '../styles/pages/QuizHome.module.scss'; // 🔒 배경 유지
import { quiz } from '../assets';
import { usePostStore } from '../store/usePostStore';
import CameraCapture from './CameraCapture';

export const QuizHomePage = () => {
  const [startCapture, setStartCapture] = useState(false); // 촬영 시작 플래그
  const setImages = usePostStore((state) => state.setImages);

  useEffect(() => {
    setImages([]); // 처음 접속 시 이미지 초기화
  }, []);

  return (
    <EyesLayout>
      <div className={styles.quizIntroBox}>
        <p className={styles.quizLine1}>
          화면을 보고 간단한 퀴즈를 풀고 있어주세요.
        </p>
        <p className={styles.quizLine2}>깜빡이가 눈 분석을 하고있어요!</p>
        <div
          className={styles.quizButton}
          onClick={() => setStartCapture(true)}
        >
          <img src={quiz} alt="퀴즈 아이콘" />
          퀴즈
        </div>
      </div>

      {/* 촬영 UI는 표시하지 않지만 실제로는 동작함 */}
      <CameraCapture startCaptureTrigger={startCapture} />
    </EyesLayout>
  );
};
