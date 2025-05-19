import axios from "axios";
import styles from "../styles/pages/ResultPage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";

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
      {!loading ? (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src="" alt="logo" />
            </div>
          </div>
          <div className={styles.contents}>{result.result}</div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
