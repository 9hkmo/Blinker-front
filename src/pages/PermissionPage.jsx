import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { EyesLayout } from '../components/EyesLayout';
import styles from '../styles/pages/Permission.module.scss';
import quizStyles from '../styles/pages/QuizHome.module.scss';
import { quiz } from '../assets';
import { usePostStore } from '../store/usePostStore';
import CameraCapture from './CameraCapture';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const QuizHomePage = () => {
  const [isCaptureDone, setIsCaptureDone] = useState(false);
  const images = usePostStore((state) => state.images);
  const setImages = usePostStore((state) => state.setImages);

  // ✅ 최초 접속 시 이미지 초기화
  useEffect(() => {
    setImages([]);
  }, []);

  // ✅ ZIP 다운로드 핸들러
  const handleDownload = async () => {
    if (!images || images.length === 0) {
      alert('저장된 이미지가 없습니다.');
      return;
    }

    const zip = new JSZip();
    images.forEach((blob, index) => {
      zip.file(`image_${index + 1}.png`, blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'captured_images.zip');
  };

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
      {/* ✅ asd 버튼 클릭 시 이미지 저장 */}
      <div
        style={{ color: 'white', cursor: 'pointer', marginTop: '20px' }}
        onClick={handleDownload}
      >
        asd
      </div>
    </div>
  );
};
