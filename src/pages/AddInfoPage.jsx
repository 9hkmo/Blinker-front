import { useEffect, useState } from "react";
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
  const [choiceTags, setChoiceTags] = useState([]);
  const [ageRange, setAgeRange] = useState("");
  const [eyeRange, setEyeRange] = useState(0.0);
  // 결과 보러 가기(와프 기준, 추후에 검사하러가기로 변경될 듯)
  const handleClick = () => {

  };

  // 태그 선택되었는지 확인
  useEffect(() => {
    console.log(choiceTags);
  }, [choiceTags]);

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
          <div className={styles.dropdown}>
            <div className={styles.selectImg}>
              <img src="" alt="bottomArrow" />
            </div>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className={styles.dropdownBox}
            >
              <option value="">나이</option>
              <option value="under10">10세 이하</option>
              <option value="10s">10~19세</option>
              <option value="20s">20~29세</option>
              <option value="30s">30~39세</option>
              <option value="40s">40~49세</option>
              <option value="50s">50~59세</option>
              <option value="60s">60~69세</option>
              <option value="70plus">70세 이상</option>
            </select>
          </div>
          <div className={styles.dropdown}>
            <div className={styles.selectImg}>
              <img src="" alt="bottomArrow" />
            </div>
            <select
              value={eyeRange}
              onChange={(e) => setEyeRange(e.target.value)}
              className={styles.dropdownBox}
            >
              <option value="">시력</option>
              <option value="under10">0.0~0.4</option>
              <option value="10s">0.5~0.9</option>
              <option value="20s">1.0~1.4</option>
              <option value="30s">1.5~2.0</option>
            </select>
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
            return (
              <Tag
                key={index}
                title={tag}
                choiceTags={choiceTags}
                setChoiceTags={setChoiceTags}
              />
            );
          })}
        </div>
      </div>
      {/* 링크 버튼도 컴포넌트로 빼도될듯? */}
      <div className={styles.linkButton} onClick={handleClick}>
        결과 보러가기
      </div>
    </div>
  );
};
