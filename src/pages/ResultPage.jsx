import styles from "../styles/ResultPage.module.scss";
import { useState } from "react";
import { Loading } from "../components/Loading";

export const ResultPage = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태

  return (
    <>
      {!loading ? (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src="" alt="logo" />
            </div>
          </div>
          <div className={styles.contents}>...데이터 정해지면</div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
