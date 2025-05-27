import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import styles from '../styles/pages/Quiz.module.scss';
import { Link } from 'react-router-dom';
import {
  quiz_end,
  correct,
  uncorrect,
  quizbackground,
  quiz_bad,
  quiz_great,
  quiz_okay,
  nextbutton,
  quiz,
  quiz_game,
  ready,
  id11,
  id12,
  id13,
  id14,
  id15,
} from '../assets';
import CameraCapture from './CameraCapture';
import { EyesLayout } from '../components/EyesLayout';

export const QuizHomePage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timerMs, setTimerMs] = useState(0);
  const [isAnswerPhase, setIsAnswerPhase] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isResultShown, setIsResultShown] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [allow, setAllow] = useState(false);
  const [quizStart, setQuizStart] = useState(false);
  const [cameraStatus, setCameraStatus] = useState('ready');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/quiz');
        const data = response.data;
        if (!data?.data?.all) throw new Error('퀴즈 데이터 없음');

        const imageMap = {
          11: id11,
          12: id12,
          13: id13,
          14: id14,
          15: id15,
        };

        const formattedQuizzes = data.data.all.map((quizItem) => {
          const id = Number(quizItem.id); // id 추가
          const question = quizItem.Question;
          const choices = quizItem.AnswerSet.map((a) => a.content);
          const answer =
            quizItem.AnswerSet.find((a) => a.isCorrect === 1)?.content || '';
          const image = imageMap[id]; // id에 해당하는 이미지
          return { id, question, choices, answer, image }; // image 포함
        });

        const selected = formattedQuizzes
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        setQuizzes(selected);
        setShuffledChoices(shuffleArray(selected[0].choices));
      } catch (error) {
        console.error('퀴즈 데이터를 가져오는데 실패함:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!quizzes.length || showResult || !allow || !quizStart) return;

    if (timerMs < 5000 && !isAnswerPhase) {
      const interval = setInterval(() => {
        setTimerMs((ms) => ms + 100);
      }, 100);
      return () => clearInterval(interval);
    }

    if (timerMs >= 5000 && !isAnswerPhase) {
      handleAutoSubmit();
    }
  }, [
    timerMs,
    showResult,
    isAnswerPhase,
    quizzes,
    currentIndex,
    allow,
    quizStart,
  ]);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const handleAutoSubmit = () => {
    const currentQuiz = quizzes[currentIndex];
    const isCorrectAnswer =
      selectedChoice !== null && selectedChoice === currentQuiz.answer;

    setIsCorrect(isCorrectAnswer);
    setShowResult(true);
    setIsAnswerPhase(true);

    if (isCorrectAnswer) {
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizzes.length) {
      setCurrentIndex(nextIndex);
      setShuffledChoices(shuffleArray(quizzes[nextIndex].choices));
      setSelectedChoice(null);
      setShowResult(false);
      setIsAnswerPhase(false);
      setTimerMs(0);
    } else {
      setShowResult(false);
      setIsQuizFinished(true);
      setTimeout(() => {
        setIsResultShown(true);
      }, 1000);
    }
  };

  if (quizzes.length === 0) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  const currentQuiz = quizzes[currentIndex];
  const remainingMs = Math.max(0, 5000 - timerMs);
  const timeLabel = (remainingMs / 1000).toFixed(1);

  return (
    <>
      <CameraCapture
        allow={allow}
        setAllow={setAllow}
        quizStart={quizStart}
        setQuizStart={setQuizStart}
        setCameraStatus={setCameraStatus}
      />

      {!quizStart && cameraStatus !== 'granted' && (
        <div className={styles.permissionWrapper}>
          <div className={styles.headerWrapper}>
            <Header isHome={true} />
          </div>
          <div className={styles.permissionContent}>
            <img
              src={cameraStatus === 'denied' ? quiz_game : ready}
              alt="카메라 상태 안내 이미지"
              className={
                cameraStatus === 'ready'
                  ? styles.permissionImageLarge
                  : styles.permissionImageSmall
              }
            />
            <p className={styles.permissionText}>
              {cameraStatus === 'denied' ? (
                <>
                  카메라 허용을 해주지 않으시면,
                  <br />눈 깜빡임을 측정할 수가 없어요!
                </>
              ) : (
                <>눈 깜빡임 분석을 위해 상단 팝업에서 허용을 눌러주세요!</>
              )}
            </p>
          </div>
        </div>
      )}

      {cameraStatus === 'granted' && !quizStart && (
        <EyesLayout>
          <div className={styles.quizIntroBox}>
            <p className={styles.quizLine1}>
              화면을 보고 간단한 퀴즈를 풀어주세요.
            </p>
            <p className={styles.quizLine2}>깜빡이가 눈 분석을 하고 있어요!</p>
            <div
              className={styles.quizButton}
              onClick={() => setQuizStart(true)}
            >
              <img src={quiz} alt="퀴즈 아이콘" />
              퀴즈
            </div>
          </div>
        </EyesLayout>
      )}

      {allow && quizStart && (
        <div
          className={styles.container}
          style={{
            backgroundImage:
              (isQuizFinished && !isResultShown) || isResultShown
                ? 'none'
                : `url(${quizbackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={styles.overlay} />
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Header isHome={true} />
          </div>

          {isQuizFinished && !isResultShown ? (
            <div className={styles.quizEndWrapper}>
              <img
                src={quiz_end}
                alt="퀴즈 종료"
                className={styles.quizEndImage}
              />
              <p className={styles.quizEndText}>퀴즈가 끝났어요.</p>
            </div>
          ) : (
            isResultShown && (
              <div className={styles.resultWrapper}>
                <img
                  src={
                    correctCount >= 5
                      ? quiz_great
                      : correctCount >= 3
                      ? quiz_okay
                      : quiz_bad
                  }
                  alt="결과"
                  className={styles.resultImage}
                />
                <p className={styles.resultScore}>{correctCount}/5</p>
                <p className={styles.resultMessage}>
                  {correctCount >= 5
                    ? '훌륭해요.'
                    : correctCount >= 3
                    ? '오...'
                    : '풉... 아, 죄송합니다.'}
                </p>
              </div>
            )
          )}
          {allow && !isQuizFinished && (
            <div className={styles.quizBox}>
              <div className={styles.quizBoxContent}>
                <div className={styles.quizContent}>
                  <h2 className={styles.question}>Q. {currentQuiz.question}</h2>
                  <ul className={styles.choiceList}>
                    {shuffledChoices.map((choice, index) => (
                      <li key={index} className={styles.choiceItem}>
                        <label className={styles.choiceLabel}>
                          <input
                            type="radio"
                            name="quiz"
                            value={choice}
                            checked={selectedChoice === choice}
                            onChange={() => setSelectedChoice(choice)}
                            className={styles.hiddenRadio}
                            disabled={showResult}
                          />
                          <span className={styles.labelContent}>
                            <span className={styles.numberPrefix}>
                              {index + 1}
                            </span>
                            {choice}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {currentQuiz.image && (
                  <img
                    src={currentQuiz.image}
                    alt={`퀴즈 이미지 ${currentQuiz.id}`}
                    className={styles.quizImage}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {!isQuizFinished && allow && quizStart && (
        <div className={styles.progressWrapper}>
          <div className={styles.progressTime}>{timeLabel}</div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${((5000 - timerMs) / 5000) * 100}%` }}
            />
          </div>
        </div>
      )}

      {showResult && allow && quizStart && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <img
              src={isCorrect ? correct : uncorrect}
              alt={isCorrect ? '정답' : '오답'}
              className={styles.resultImage}
            />
            <p className={styles.resultText}>
              {isCorrect
                ? '정답이에요!'
                : `오답이에요. 정답은 ${currentQuiz.answer}입니다.`}
            </p>
          </div>
        </div>
      )}

      {isResultShown && allow && quizStart && (
        <div className={styles.resultButtonWrapper}>
          <Link to="/result" className={styles.resultFixedNextButton}>
            <span>다음</span>
            <img
              src={nextbutton}
              alt="다음 아이콘"
              className={styles.nextIcon}
            />
          </Link>
        </div>
      )}
    </>
  );
};
