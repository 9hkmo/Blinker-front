import { useEffect, useState } from "react";
import styles from "../styles/Loading.module.scss";

// 보여줄 문구들
const texts = [
  "눈 깜짝할 사이에 로딩 중...",
  "눈 한번 깜빡이면 시작됩니다 👁️✨",
  "눈 감지 중... 너무 오래 감으면 졸린 걸로 간주합니다 ",
  "깜빡하지 마세요, 당신의 눈이 중요하니까요 😉",
  "로딩 중... 눈 깜빡임 체크 완료까지 잠시만요!",
  "눈이 편안~해야 집중도 잘 되죠. 준비 중입니다!",
  "당신의 소중한 눈, 우리가 지켜드립니다. 잠시만 기다려주세요!",
  "눈알 굴리지 마세요... 금방 시작합니다 😆",
  "잠깐! 지금 눈 깜빡였죠?",
  "눈치껏 기다려 주세요, 눈 건강 지키는 중입니다 👁️👁️",
  "눈꼽떼는 중...",
  "인공눈물 넣는중...",
  "남몰래 눈물 훔치는중...",
];

// 결과 페이지에서 api를 다 받지 않았거나 5초간 로딩을 보여줌. 따라서 컴포넌트로 위치함
export const Loading = () => {
  const [text, setText] = useState(texts[0]);

  useEffect(() => {
    const textRandomInterval = setInterval(() => {
      setText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000);
    return () => { // 언마운트 시 타이머 종료
      clearInterval(textRandomInterval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.loadingImg}>
          <img src="" alt="gif" />
        </div>
        <div className={styles.progressBar}>
          <div className={styles.bar}></div>
        </div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
