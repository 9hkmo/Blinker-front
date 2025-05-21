import axios from "axios";
import styles from "../styles/pages/ResultPage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Header } from "../components/Header";
import { arrow_right, logo_result_game, mini_char, result1, result2, result3, result4 } from "../assets";

export const ResultPage = () => {
  const [result, setResult] = useState(null); // result는 통신 이후에 명세서보고 변경
  const [loading, setLoading] = useState(true); // 로딩 상태
  const { id } = useParams(); // URL에서 id 추출

  // 데이터 가져오기
  useEffect(() => {
    console.error(id);

    const getResult = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5173/result/api/${id}`);
        if (!res.data) {
          throw new Error("결과 데이터가 존재하지 않습니다.");
        }
        setResult(res.data);
      } catch (err) {
        console.error("결과 불러오기 실패:", err);
      } finally {
        // setLoading(false);
      }
    };
    getResult();
  }, [id]);

  return (
    <>
      {loading ? (
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
                      권장 깜빡임 주기: {result.duration}4초에 한 번씩 눈을
                      천천히 깜빡여 주세요.
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
                          <span>{result.score}50점</span> / 100점
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
                      {/* {result.tip} */}만 40세 남성의 경우, 시력 0.1과 안경
                      착용 시 0.5는 동일 연령대에 비해 다소 낮은 편입니다.
                      노안도 보통 이 나이에 자주 나타날 수 있습니다.
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
                    <span>
                      * AI 분석을 바탕으로 작성된 깜빡이의 조언이에요.
                    </span>
                  </div>
                  <div className={styles.img}>
                    <img src={result3} />
                  </div>
                </div>
                <div className={styles.advice}>
                  {/* {result.food} */}
                  남성분의 시력과 노안 문제를 고려할 때, 눈 건강에 도움이 되는
                  몇 가지 음식을 추천해드릴 수 있습니다:\n\n1. **연어**: 연어와
                  같은 지방이 풍부한 생선에는 오메가-3 지방산이 많이 함유되어
                  있어 눈 건강 유지에 도움을 줄 수 있습니다. 오메가-3는 망막의
                  기능을 지원하고, 건조한 눈 증상을 완화하는 데에도
                  효과적입니다.\n\n2. **시금치**: 시금치와 같은 녹색 잎채소에는
                  루테인과 제아잔틴이 풍부하게 들어있습니다. 이 두 가지
                  항산화제는 눈의 황반 부위를 보호하고, 노화로 인한 시력 손실을
                  예방하는 데 도움을 줄 수 있습니다.\n\n이러한 음식들을
                  규칙적으로 섭취하면 눈 건강을 유지하는 데 도움이 될 수
                  있습니다.
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
                    {/* {result.stretch} */}
                    권장 깜빡임 주기: 4초에 한 번씩 눈을 천천히 깜빡여 주세요.
                    권장 깜빡임 주기: 4초에 한 번씩 눈을 천천히 깜빡여 주세요.
                    권장 깜빡임 주기: 4초에 한 번씩 눈을 천천히 깜빡여 주세요.
                  </span>
                </div>
              </div>
              <div className={styles.gameBox}>
                <div className={styles.gameImg}>
                  <img src={logo_result_game} />
                </div>
                <div className={styles.gameBtn}>
                  <span>미니게임 하러가기</span>
                  <img src={arrow_right} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
