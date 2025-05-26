import styles from "../styles/components/EyesLayout.module.scss";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { home, home_quiz, pupil } from "../assets";
import { useLocation } from "react-router-dom";

export const EyesLayout = ({ children }) => {
  const location = useLocation();
  const [isImg, setIsImg] = useState(true);

  useEffect(() => {
    if (location.pathname === "/quiz") {
      setIsImg(false);
    }
  }, [location]);

  useEffect(() => {
    // 전체 눈과 눈동자를 가져옴
    const eyes = document.querySelectorAll(`.${styles.eye}`);
    const pupils = document.querySelectorAll(`.${styles.pupil}`);

    const handleMouseMove = (e) => {
      // 전체 화면의 마우스 위치
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      eyes.forEach((eye, index) => {
        // 현재 눈에 맞는 눈동자 가져오기
        const pupil = pupils[index];
        const eyeRect = eye.getBoundingClientRect(); // 현재 눈 요소의 화면 내 위치와 크기 정보를 가져옴
        // 눈의 중심 좌표 계산 (가로, 세로 중심점)
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        // 마우스 위치와 눈 중심 사이의 각도 계산 (라디안 단위)
        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        // 눈동자가 움직여야 할 X, Y 거리 산출 (삼각함수 이용)
        const pupilX = (eyeRect.width / 4) * Math.cos(angle);
        const pupilY = (eyeRect.height / 4) * Math.sin(angle);

        pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.homeImg}>
        <img src={isImg ? home : home_quiz} />
      </div>
      <Header isHome={true} />
      <div className={styles.contents1}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents2}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents3}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents4}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents5}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents6}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents7}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      <div className={styles.contents8}>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
        <div className={styles.eye}>
          <img className={styles.pupil} src={pupil} />
        </div>
      </div>
      {children}
    </div>
  );
};
