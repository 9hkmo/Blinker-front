import { useEffect, useState } from "react";
import { Tag } from "../components/Tag";
import styles from "../styles/pages/AddInfoPage.module.scss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { arrow_right, move_char } from "../assets";
import { MoveEyeTitle } from "../components/MoveEyeTitle";

const tags = [
  { title: "두통", value: "headache" },
  { title: "흐림시야", value: "blurred_vision" },
  { title: "초점", value: "accommodation_disorder" },
  { title: "가려움", value: "pruritus" },
  { title: "안구건조", value: "xerophthalmia" },
  { title: "붓기", value: "tumefy" },
  { title: "내부통증", value: "internal_pain" },
  { title: "충혈", value: "hyperemia" },
  { title: "따가움", value: "stinging" },
  { title: "떨림", value: "quiver" },
  { title: "빛 번짐", value: "Photopsia" },
  { title: "근육마비", value: "paralysis" },
  { title: "피로", value: "fatigue" },
  { title: "당김", value: "pulling" },
  { title: "어려운 눈뜨기", value: "blepharospasm" },
  { title: "눈물 과다 분비", value: "epipphora" },
  { title: "동공", value: "pupil" },
];

// 옵션의 value값을 백에 전달해줘야함. 이때 숫자로 전달할 지, 문자로 전달할 지
// 7세~80세까지만 일단 받고 백엔에 전달
const ageOptions = [
  { value: null, label: "나이", isDisabled: true },
  ...Array.from({ length: 74 }, (_, i) => {
    const age = i + 7;
    return {
      value: `${age}`,
      label: `${age}세`,
    };
  }),
];
// 시력. 안경착용한 시력과 미착용 시력을 하나로 묶음
const eyeOptions = [
  { value: null, label: "시력", isDisabled: true },
  {
    value: "notice",
    label: "안경을 착용하셨으면 안경 쓴 시력을 선택하세요!",
    isDisabled: true, // 못 고르게
  },
  ...Array.from({ length: 21 }, (_, i) => {
    const age = i * (0.1).toFixed(1); // 1.0으로 자릿수 설정
    return {
      value: `${age.toFixed(1)}`,
      label: `${age.toFixed(1)}`,
    };
  }),
];

// react-select에 스타일을 적용하려면 2가지 방법으로 적용해야한다.
// 1. 아래 방법: 스타일을 객체로 전달(CSS-in-JS 객체)
// 2. classNamePrefix에 설정한 .클래스이름__control 이런식으로 css에서 적용
const customStyles = {
  control: (base, state) => ({
    // 맨위 컨트롤러 스타일
    ...base,
    borderRadius: "15px",
    border: "none",
    boxShadow: "0 0 0 4px #1C5F8E",
    backgroundColor:
      (state.hasValue || state.isFocused) &&
      state.selectProps.value?.value !== null
        ? "#0485A2"
        : "none", // null이 아닌 값을 가졌을 때
    minWidth: "276px",
    minHeight: "83px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0485a233",
      cursor: "pointer",
    },
  }),
  singleValue: (base) => ({
    // 맨위(선택된) 옵션의 스타일일
    ...base,
    color: "white",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
  }),
  menu: (base) => ({
    // 옵션 컨테이너의 스타일
    ...base,
    borderRadius: "15px",
    overflow: "hidden",
    minHeight: "289px",
    backgroundColor: "#E8F8EE",
    padding: "18px",
    gap: "18px",
    transition: "all 0.3s ease",
  }),
  option: (base) => ({
    // 옵션 하나하나의 스타일
    ...base,
    textAlign: "cetner",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "10px",
    marginBottom: "18px",
    color: "black",
    fontSize: "24px",
    fontWeight: "500",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0E6F3A",
      color: "white",
      cursor: "pointer",
    },
  }),
  dropdownIndicator: (base) => ({
    // 드롭다운 화살표 스타일
    ...base,
    position: "absolute",
    left: "30%",
    color: "white",
  }),
};

export const AddInfoPage = () => {
  const [choiceTags, setChoiceTags] = useState([]);
  // Select는 객체 반환
  const [selectedAge, setSelectedAge] = useState({});
  const [selectedEye, setSelectedEye] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [moveIndex, setMoveIndex] = useState(1);
  const navigate = useNavigate();

  // 결과 보러 가기(와프 기준, 추후에 검사하러가기로 변경될 듯)
  // 주소 값은 임의로 설정. 전달해줄 값은 나이, 시력, 선택한 태그들
  // 검사 페이지에서 백엔드에 전송해줄 때 이 값들을 같이 넘겨주면 될듯하다.
  // 검사 페이지에서는 state가 있는지 꼭 확인해줘야함(없으면 에러 페이지 또는 추가 정보 페이지로 이동)
  const handleClick = () => {
    // 태그는 아무것도 없을 수 있음
    if (isSelected) {
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

  // 나이와 시력이 선택 되었는지 확인
  useEffect(() => {
    if (selectedAge.value && selectedEye.value) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedAge, selectedEye]);

  useEffect(() => {
    const moveCharInterval = setInterval(() => {
      setMoveIndex(Math.floor(Math.random() * 5) + 1); // 나오는 주기 설정할 수 있음(1~3만 나옴)
    }, 3000);

    return () => {
      clearInterval(moveCharInterval);
    };
  }, []);
  useEffect(() => {
    console.log(moveIndex);
  }, [moveIndex]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={`${styles.moveChar} ${styles.char1}`}>
        <img
          src={move_char}
          className={`${moveIndex === 1 ? styles.visible : ""}`}
          alt="Blinker"
        />
      </div>
      <div className={`${styles.moveChar} ${styles.char2}`}>
        <img
          src={move_char}
          className={`${moveIndex === 2 ? styles.visible : ""}`}
          alt="Blinker"
        />
      </div>
      <div className={`${styles.moveChar} ${styles.char3}`}>
        <img
          src={move_char}
          className={`${moveIndex === 3 ? styles.visible : ""}`}
          alt="Blinker"
        />
      </div>
      <div
        className={`${styles.modalContainer} ${isModal ? "" : styles.hidden}`}
      >
        {!selectedAge.value ? "나이를 선택해주세요!" : "시력을 선택해주세요!"}
      </div>
      <div className={styles.contents}>
        <MoveEyeTitle />
        <div className={styles.selectContainer}>
          <Select
            defaultValue={ageOptions[0]}
            name="나이"
            options={ageOptions}
            placeholder="연령대 선택"
            onChange={handleAgeChange}
            styles={customStyles}
            components={{ IndicatorSeparator: () => null }} // 구분선 삭제
            isSearchable={false} // 입력 불가하게 설정
          />
          <Select
            defaultValue={eyeOptions[0]}
            name="시력"
            options={eyeOptions}
            placeholder="시력 선택"
            onChange={handleEyeChange}
            styles={customStyles}
            components={{ IndicatorSeparator: () => null }} // 구분선 삭제
            isSearchable={false} // 입력 불가하게 설정
          />
        </div>
        <div className={styles.description}>
          다음 중 본인에게 해당되는 증상과 일치하는 것을 골라주세요.
        </div>
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => {
            return (
              <Tag
                key={index}
                tag={tag}
                choiceTags={choiceTags}
                setChoiceTags={setChoiceTags}
              />
            );
          })}
        </div>
      </div>
      {/* 링크 버튼도 컴포넌트로 빼도될듯? */}
      <div
        className={`${styles.linkButton} ${
          isSelected ? styles.isSelected : ""
        }`}
        onClick={handleClick}
      >
        <div className={styles.text}>검사</div>
        <img src={arrow_right} alt="arrow" />
      </div>
    </div>
  );
};
