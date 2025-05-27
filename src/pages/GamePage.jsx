import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import styles from "../styles/pages/GamePage.module.scss";
import {
  eye1,
  eye2,
  eye3,
  game_char,
  game_char_modal,
  game_loading,
  minigame,
} from "../assets";
import { EyesLayout } from "../components/EyesLayout";
import { useLocation } from "react-router-dom";

const pathWZ = [
  { top: "20%", left: "10%" },
  { top: "80%", left: "30%" },
  { top: "20%", left: "50%" },
  { top: "80%", left: "70%" },
  { top: "20%", left: "90%" },
  { top: "20%", left: "10%" },
  { top: "20%", left: "90%" },
  { top: "80%", left: "10%" },
  { top: "80%", left: "90%" },
];

const pathD = [
  { top: "20%", left: "50%" },
  { top: "80%", left: "10%" },
  { top: "40%", left: "90%" },
  { top: "40%", left: "10%" },
  { top: "80%", left: "90%" },
  { top: "20%", left: "50%" },

  { top: "80%", left: "10%" },
  { top: "80%", left: "90%" },
  { top: "20%", left: "50%" },
  { top: "80%", left: "10%" },
  { top: "80%", left: "90%" },
  { top: "20%", left: "50%" },
];

const pathB = [
  { top: "50%", left: "50%" },
  { top: "50%", left: "50%" },
  { top: "50%", left: "50%" },
  { top: "50%", left: "50%" },
];

const paths = {
  WZ: pathWZ,
  D: pathD,
  B: pathB,
};

const gameData = [
  {
    path: "D",
    img: eye1,
    text: (
      <>
        '안구 운동이 대학생의 눈 건강과 동체시력에 미치는 영향'
        <br />- 김주현 (원광보건대학교) 참조.
      </>
    ),
  },
  {
    path: "WZ",
    img: eye2,
    text: (
      <>
        '율동적 시력강화 운동이 초등학교 저학년생의 시력, 굴절이상, 눈의
        피로감에 미치는 효과'
        <br />- 백혜원 (계명대학교 교육대학원 간호교육전공 국내석사) 참조.
      </>
    ),
  },
  {
    path: "B",
    img: eye3,
    text: (
      <>
        '율동적 시력강화 운동이 초등학교 저학년생의 시력, 굴절이상, 눈의
        피로감에 미치는 효과'
        <br />- 백혜원 (계명대학교 교육대학원 간호교육전공 국내석사) 참조.
      </>
    ),
  },
];

export const GamePage = () => {
  const [currentPathKey, setCurrentPathKey] = useState(null);
  const [path, setPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState(true);
  const [charClicked, setCharClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 게임 운동 효과 설명 모달
  const [gameDataIndex, setGameDataIndex] = useState(0);
  const state = useLocation().state;

  // 경로 선택 함수 (현재 경로 제외하고 랜덤)
  const selectRandomPathKey = (excludeKey) => {
    const keys = Object.keys(paths).filter((key) => key !== excludeKey);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const selectGameData = (pathKey) => {
    const data = gameData.find((item) => item.path === pathKey);
    if (data) {
      setGameDataIndex(gameData.indexOf(data));
    }
  };

  // 초기 경로 세팅 (랜덤)
  useEffect(() => {
    const initialKey = selectRandomPathKey(null); // exclude 없으니까 그냥 랜덤
    setCurrentPathKey(initialKey);
    setPath(paths[initialKey]);
    setCurrentIndex(0);
    selectGameData(initialKey);
  }, []);

  // 클릭 이벤트: 다음 위치로 이동 또는 경로 변경
  const handleClick = () => {
    if (path.length === 0) return;

    setCharClicked(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % path.length;
      // 경로 끝에 도달 → 다른 경로 선택
      if (nextIndex === 0) {
        selectGameData(currentPathKey);
        const newPathKey = selectRandomPathKey(currentPathKey);
        setCurrentPathKey(newPathKey);
        setPath(paths[newPathKey]);
        setCurrentIndex(0);
        setIsModalOpen(true);
      } else {
        setCurrentIndex(nextIndex);
      }
    }, 300);
  };

  // 현재 위치 계산
  const position = path[currentIndex];

  useEffect(() => {
    setTimeout(() => {
      setCharClicked(false); // 클릭 상태 초기화
    }, 800);
  }, [position]);

  const enterGame = () => {
    setHome(false);
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5초 후에 게임 시작
    return () => {
      clearTimeout(loadingTimeout); // 컴포넌트 언마운트 시 타이머 제거
    };
  };

  // 홈에서 들어오면 게임 바로 시작(미니게임 홈 화면 안보여줌)
  useEffect(() => {
    if (state && state.home === false) {
      enterGame();
    }
  }, [state]);

  return (
    <>
      {home ? (
        <EyesLayout>
          <div className={styles.gameButton} onClick={enterGame}>
            <img src={minigame} alt="미니게임 아이콘" />
            미니 게임
          </div>
        </EyesLayout>
      ) : (
        <div className={styles.container}>
          <Header isHome={true} />

          <div className={`${styles.home} ${!loading && styles.hidden}`}>
            <div className={styles.homeImg}>
              <img src={game_loading} />
            </div>
            <span>깜빡이를 잡아라!</span>
          </div>
          <div
            className={`${styles.modalContainer} ${
              isModalOpen && styles.isOpen
            }`}
          >
            <div className={styles.leftBox}>
              <span className={styles.modalTitle}>
                이 게임은 사실 너의 눈 건강에 도움이 되도록 설계한 게임이야!
              </span>
              <img src={gameData[gameDataIndex].img} />
              <span className={styles.modalText}>
                {gameData[gameDataIndex].text}
              </span>
            </div>
            <div className={styles.rightBox}>
              <img src={game_char_modal} />
              <div
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                게임 더하기
              </div>
            </div>
          </div>
          {gameDataIndex === 2 ? (
            <div className={styles.orbitContainer}>
              <div className={styles.orbit}>
                <div
                  className={`${styles.planet} ${loading && styles.hidden}`}
                  onClick={handleClick}
                  style={{
                    ...(charClicked && {
                      transform: "translate(-50%, -50%) scale(0.5)",
                    }),
                  }}
                >
                  <img src={game_char} alt="circle" />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.circle} ${loading && styles.hidden}`}
              onClick={handleClick}
              style={{
                ...position,
                ...(charClicked && {
                  transform: "translate(-50%, -50%) scale(0.5)",
                }),
              }}
            >
              <img src={game_char} alt="circle" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
