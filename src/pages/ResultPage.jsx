import styles from "../styles/pages/ResultPage.module.scss";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  arrow_right,
  logo_result_game,
  mini_char,
  result1,
  result2,
  result3,
  result4,
} from "../assets";
import { usePostStore } from "../store/usePostStore";
import { postResult } from "../api/post";

export const ResultPage = () => {
  const { age, vision, tags, images } = usePostStore(); // 전역 데이터 꺼내기
  const [result, setResult] = useState(null); // result는 통신 이후에 명세서보고 변경
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();

  // 데이터 가져오기
  // post 방식으로 보내고 반환값으로 데이터 받기(우리는 db에 결과 데이터를 저장하지 않기 때문)
  useEffect(() => {
    console.log(age, vision, tags, images);
    const getResult = async () => {
      if (!age || !vision || !tags || !images) navigate("/home"); // 데이터가 없으면 홈으로 이동
      try {
        const data = await postResult({ age, vision, tags, images });
        if (!data) throw new Error("결과 데이터가 존재하지 않습니다.");
        setResult(data);
      } catch (err) {
        console.error("결과 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    getResult();
  }, []);

  // 카카오톡 공유하기 기능
  const handleShareKakao = () => {
    window.Kakao.Share.sendCustom({
      templateId: 120920,
      templateArgs: {
        // tip: `${result.tip}`,
        // term: `${result.term}`,
        // score: `${result.score}`,
        // stretchTips: `${result.stretchTips.join(", ")}`,
        tip: `시력 1.0은 정상이나, 질병이 우려됩니다. 같은 연령대에서는 드문 상태입니다.`,
        term: `4`,
        score: `70`,
        stretchTips: `고정 응시 운동(2분), 손바닥 온찜질(1분), 눈 굴리기(5회씩)`,
      },
    });
  };

  // 로딩 띄우기
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={mini_char} alt="logo" />
        </div>
        <span>Report</span>
      </div>
      <div className={styles.contents}>
        <div className={styles.content}>
          <div className={styles.eyeContainer}>
            <div className={styles.eyeBox}>
              <div className={styles.img}>
                <img src={result1} />
              </div>
              <div className={styles.description}>
                <div className={styles.title}>적절한 눈 깜빡임 주기</div>
                <span className={styles.text}>
                  권장 깜빡임 주기:
                  {/* {result.duration} */}
                  4초에 한 번씩 눈을 천천히 깜빡여 주세요.
                </span>
              </div>
            </div>

            <div className={styles.eyeBox}>
              <div className={styles.scoreDescription}>
                <div className={styles.scoreTitle}>나의 눈 건강 점수</div>
                <div className={styles.scoreBox}>
                  <div className={styles.scoreContent}>
                    <span>AI 평가 점수</span>
                    <div className={styles.score}>
                      <span>
                        {/* {result.score} */}
                        50점
                      </span>{" "}
                      / 100점
                    </div>
                  </div>
                  <div className={styles.scoreContent}>
                    시력 저하 및 눈건조로 인해 눈 건강에 적신호
                    <br />
                    일상적인 눈관리습관과 영양 섭취 개선이 필요합니다.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.eyeBox}>
              <div className={styles.description}>
                <div className={styles.title}>
                  동연령자에 비해 나의 눈 건강은?
                </div>
                <span className={styles.text}>
                  {/* {result.tip} */}만 40세 남성의 경우, 시력 0.1과 안경 착용
                  시 0.5는 동일 연령대에 비해 다소 낮은 편입니다. 노안도 보통 이
                  나이에 자주 나타날 수 있습니다.
                </span>
              </div>
              <div className={styles.img}>
                <img src={result2} />
              </div>
            </div>
          </div>
          <div className={styles.adviceContainer}>
            <div className={styles.adviceHeader}>
              <div className={styles.advicetextBox}>
                <div className={styles.title}>깜빡이의 한마디💬</div>
                <span>* AI 분석을 바탕으로 작성된 깜빡이의 조언이에요.</span>
              </div>
              <div className={styles.img}>
                <img src={result3} />
              </div>
            </div>
            <div className={styles.advice}>
              <span className={styles.title}>
                눈에 좋은 음식 추천해드릴게요!
              </span>
              <div className={styles.foodContainer}>
                <div className={styles.foodRow}>
                  <div className={styles.foodName}>이름</div>
                  <div className={styles.foodIngredient}>성분</div>
                  <div className={styles.foodEffect}>효과</div>
                </div>
                {/* {result.food} */}
                {[
                  {
                    name: "시금치",
                    ingredient: ["루테인"],
                    effect: ["눈 피로 완화", "항산화 작용"],
                  },
                  {
                    name: "당근",
                    ingredient: ["비타민A"],
                    effect: ["눈 점막 보호", "야맹증 예방"],
                  },
                  {
                    name: "계란노른자",
                    ingredient: ["비타민A"],
                    effect: ["눈 점막 보호", "야맹증 예방"],
                  },
                ].map((food, index) => (
                  <div key={index} className={styles.foodRow}>
                    <div className={styles.foodName}>{food.name}</div>
                    <div className={styles.foodIngredient}>
                      <div>{food.ingredient.join(", ")}</div>
                    </div>
                    <div className={styles.foodEffect}>
                      {food.effect.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.stretchBox}>
            <div className={styles.img}>
              <img src={result4} />
            </div>
            <div className={styles.description}>
              <div className={styles.title}>스트레칭 가이드라인</div>
              <span className={styles.text}>
                {/* {result.stretchTips.join(", ")} */}
                {[
                  "고정 응시 운동(2분)",
                  "손바닥 온찜질(1분)",
                  "눈 굴리기(5회씩)",
                ].join(", ")}
              </span>
            </div>
          </div>
          <div className={styles.gameBox}>
            <div className={styles.gameImg}>
              <img src={logo_result_game} />
            </div>
            <Link to="/game" className={styles.gameBtn}>
              <span>미니게임 하러가기</span>
              <img src={arrow_right} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.shareContainer}>
        <div className={styles.shareText}>
          요약된 결과를 공유해보세요!
          <br />
          <span>(아래 버튼 클릭 시 카카오톡으로 공유할 수 있습니다!)</span>
        </div>
        <div className={styles.shareButton} onClick={handleShareKakao}>
          공유하기
        </div>
      </div>
    </div>
  );
};
