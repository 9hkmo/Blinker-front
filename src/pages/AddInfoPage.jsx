import { Tag } from "../components/Tag";
import styles from "../styles/AddInfoPage.module.scss";

const tags = [
  "두통",
  "시야흐림",
  "초점 문제",
  "눈뜨기 어려움",
  "가려움",
  "건조감",
  "부음",
  "내부 통증",
  "눈동자 움직임 통증",
  "압박감",
  "따가움",
  "충혈",
  "눈꺼풀 떨림",
  "빛 번짐",
  "눈물 과다 분비",
  "근육 마비",
  "피로감",
  "이물감",
  "뻑뻑함",
];

export const AddInfoPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleImg}>
          <img src="" alt="BLINKER" />
        </div>
      </div>
      <div className={styles.contents}>
        {/* 드롭다운 구현해야 함 */}
        <div className={styles.selectContainer}>
          <div className={styles.Dropdown}>
            <div className={styles.selectImg}>
              <img src="" alt="bottomArrow" />
            </div>
          </div>
          <div className={styles.Dropdown}>
            <div className={styles.selectImg}>
              <img src="" alt="bottomArrow" />
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.moveChar}>
              <img src="" alt="moveChar" />
            </div>
            <div className={styles.text}>
              다음 중 본인에게 해당되는 증상과 일치하는 것을 골라주세요
            </div>
          </div>
          <div className={styles.tagContainer}>
            {tags.map((tag, index) => {
              return <Tag title={tag} key={index} />;
            })}
          </div>
        </div>
      </div>
      {/* 링크 버튼도 컴포넌트로 빼도될듯? */}
      <div className={styles.linkButton}>결과 보러가기</div>
    </div>
  );
};
