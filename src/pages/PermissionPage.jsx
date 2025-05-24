import { Header } from '../components/Header';
import styles from '../styles/pages/Permission.module.scss';
import { useEffect, useRef } from 'react';
import { logo_title_eye } from '../assets';

export const GamePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log('카메라 허용됨');
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('카메라 거부됨:', err);
        alert('카메라 접근을 허용해주세요.');
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header isHome={true} />

      {/* ✅ 배경처럼 처리할 이미지 */}
      <img src={logo_title_eye} alt="배경" className={styles.bgImage} />

      <div className={styles.permissionBox}>
        <h2>카메라 접근 권한이 필요합니다</h2>
        <p>눈 추적 기능을 위해 카메라 사용을 허용해 주세요</p>
      </div>

      {/* (선택) 카메라 영상 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={styles.video}
      />
    </div>
  );
};
