import { useEffect, useState } from "react";
import { Tag } from "../components/Tag";
import styles from "../styles/AddInfoPage.module.scss";
import Select from "react-select";

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

const ageOptions = [
  { value: null, label: "나이" },
  { value: "10under", label: "9세 이하" },
  { value: "10s", label: "10~19세" },
  { value: "20s", label: "20~29세" },
  { value: "30s", label: "30~39세" },
  { value: "40s", label: "40~49세" },
  { value: "50s", label: "50~59세" },
  { value: "60s", label: "60~69세" },
  { value: "70plus", label: "70세 이상" },
];

const eyeOptions = [
  { value: null, label: "시력" },
  { value: 0.0, label: "0.0~0.4" },
  { value: 0.5, label: "0.5~0.9" },
  { value: 1.0, label: "1.0~1.4" },
  { value: 1.5, label: "1.5~2.0" },
];

export const AddInfoPage = () => {
  const [choiceTags, setChoiceTags] = useState([]);
  // Select는 객체 반환
  const [selectedAge, setSelectedAge] = useState({});
  const [selectedEye, setSelectedEye] = useState({});

  // 결과 보러 가기(와프 기준, 추후에 검사하러가기로 변경될 듯)
  const handleClick = () => {};

  // 태그 선택되었는지 확인
  useEffect(() => {
    console.log(choiceTags);
  }, [choiceTags]);

  // 나이 선택 함수
  const handleAgeChange = (option) => {
    setSelectedAge(option);
    console.log(selectedAge.value);
  };
  // 시력 선택 함수
  const handleEyeChange = (option) => {
    setSelectedEye(option);
    console.log(selectedEye.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleImg}>
          <img src="" alt="BLINKER" />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.selectContainer}>
          <Select
            className={styles.selectBox}
            defaultValue={ageOptions[0]}
            name="나이"
            options={ageOptions}
            placeholder="연령대 선택"
            onChange={handleAgeChange}
            classNamePrefix={styles.dropdown}
          />
          <Select
            className={styles.selectBox}
            defaultValue={eyeOptions[0]}
            name="시력"
            options={eyeOptions}
            placeholder="시력 선택"
            onChange={handleEyeChange}
            classNamePrefix={styles.dropdown}
          />
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
