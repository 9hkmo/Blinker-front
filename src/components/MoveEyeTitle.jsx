import { useEffect } from "react";
import { logo_title, pupil } from "../assets";
import styles from "../styles/components/MoveEyeTitle.module.scss";

export const MoveEyeTitle = () => {
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
      <img src={logo_title} />
      <div className={styles.contents}>
        <div class={styles.eye}>
          <img class={styles.pupil} src={pupil} />
        </div>
        <div class={styles.eye}>
          <img class={styles.pupil} src={pupil} />
        </div>
      </div>
    </div>
  );
};
