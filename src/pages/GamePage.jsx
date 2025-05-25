import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import styles from "../styles/pages/GamePage.module.scss";
import { game_char } from "../assets";

const pathW = [
  { top: "20%", left: "10%" },
  { top: "80%", left: "30%" },
  { top: "20%", left: "50%" },
  { top: "80%", left: "70%" },
  { top: "20%", left: "90%" },
];

const pathZ = [
  { top: "20%", left: "10%" },
  { top: "20%", left: "90%" },
  { top: "80%", left: "10%" },
  { top: "80%", left: "90%" },
];

const pathD = [
  { top: "20%", left: "50%" },
  { top: "50%", left: "20%" },
  { top: "90%", left: "40%" },
  { top: "90%", left: "60%" },
  { top: "50%", left: "80%" },
];

const paths = {
  W: pathW,
  Z: pathZ,
  D: pathD,
};

export const GamePage = () => {
  const [currentPathKey, setCurrentPathKey] = useState(null);
  const [path, setPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 경로 선택 함수 (현재 경로 제외하고 랜덤)
  const selectRandomPathKey = (excludeKey) => {
    const keys = Object.keys(paths).filter((key) => key !== excludeKey);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  // 초기 경로 세팅 (랜덤)
  useEffect(() => {
    const initialKey = selectRandomPathKey(null); // exclude 없으니까 그냥 랜덤
    setCurrentPathKey(initialKey);
    setPath(paths[initialKey]);
    setCurrentIndex(0);
  }, []);

  // 클릭 이벤트: 다음 위치로 이동 또는 경로 변경
  const handleClick = () => {
    if (path.length === 0) return;

    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % path.length;
      // 경로 끝에 도달 → 다른 경로 선택
      if (nextIndex === 0) {
        const newPathKey = selectRandomPathKey(currentPathKey);
        setCurrentPathKey(newPathKey);
        setPath(paths[newPathKey]);
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIndex);
      }
    }, 300);
  };

  // 현재 위치 계산
  const position = path[currentIndex];

  return (
    <div className={styles.container}>
      <Header />
      <div
        className={styles.circle}
        onClick={handleClick}
        style={{
          ...position,
        }}
      >
        <img src={game_char} alt="circle" />
      </div>
    </div>
  );
};
