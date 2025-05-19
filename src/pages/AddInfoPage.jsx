import { useEffect, useState } from "react";
import { Tag } from "../components/Tag";
import styles from "../styles/pages/AddInfoPage.module.scss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

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

// 옵션의 value값을 백에 전달해줘야함. 이때 숫자로 전달할 지, 문자로 전달할 지
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
  { value: "idk", label: "잘 모르겠다" },
  { value: "0.0", label: "0.0~0.4" },
  { value: "0.5", label: "0.5~0.9" },
  { value: "1.0", label: "1.0~1.4" },
  { value: "1.5", label: "1.5~2.0" },
];

// react-select에 스타일을 적용하려면 2가지 방법으로 적용해야한다.
// 1. 아래 방법: 스타일을 객체로 전달(CSS-in-JS 객체)
// 2. classNamePrefix에 설정한 .클래스이름__control 이런식으로 css에서 적용
const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "15px",
    padding: "6px",
    border: "1px solid black",
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    borderColor: state.isFocused ? "white" : "#ccc",
    width: "200px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "15px",
    overflow: "hidden",
  }),
  option: (base) => ({
    ...base,
    textAlign: "cetner",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  }),
};

export const AddInfoPage = () => {
  const [choiceTags, setChoiceTags] = useState([]);
  // Select는 객체 반환
  const [selectedAge, setSelectedAge] = useState({});
  const [selectedEye, setSelectedEye] = useState({});
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();

  // 결과 보러 가기(와프 기준, 추후에 검사하러가기로 변경될 듯)
  // 주소 값은 임의로 설정. 전달해줄 값은 나이, 시력, 선택한 태그들
  // 검사 페이지에서 백엔드에 전송해줄 때 이 값들을 같이 넘겨주면 될듯하다.
  // 검사 페이지에서는 state가 있는지 꼭 확인해줘야함(없으면 에러 페이지 또는 추가 정보 페이지로 이동)
  const handleClick = () => {
    // 태그는 아무것도 없을 수 있음
    if (selectedAge.value && selectedEye.value) {
      console.log("전송");
      navigate("/quiz", {
        state: {
          tags: choiceTags,
          age: selectedAge.value,
          eye: selectedEye.value,
        },
      });
    } else {
      console.log("오류");
      setIsModal(true);
    }
  };

  useEffect(() => {
    const modalOpen = setTimeout(() => {
      setIsModal(false);
    }, 3000);

    return () => {
      clearTimeout(modalOpen); // 언마운트 시 타이머 삭제
    };
  }, [isModal]);

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
      <div
        className={`${styles.modalContainer} ${isModal ? "" : styles.hidden}`}
      >
        {!selectedAge.value ? "나이를 선택해주세요!" : "시력을 선택해주세요!"}
      </div>
      <div className={styles.header}>
        <div className={styles.titleImg}>
          <img src="" alt="BLINKER" />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.selectContainer}>
          <Select
            defaultValue={ageOptions[0]}
            name="나이"
            options={ageOptions}
            placeholder="연령대 선택"
            onChange={handleAgeChange}
            styles={customStyles}
            components={{ IndicatorSeparator: () => null }} // 구분선 삭제
          />
          <Select
            defaultValue={eyeOptions[0]}
            name="시력"
            options={eyeOptions}
            placeholder="시력 선택"
            onChange={handleEyeChange}
            styles={customStyles}
            components={{ IndicatorSeparator: () => null }} // 구분선 삭제
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
