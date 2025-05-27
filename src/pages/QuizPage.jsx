import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
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
} from '../assets';
import CameraCapture from './CameraCapture';

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
  const [isResultShown, setIsResultShown] = useState(false); // ✅ 결과 화면 전환
  const [correctCount, setCorrectCount] = useState(0); // ✅ 정답 수
  const [isCaptureDone, setIsCaptureDone] = useState(false);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://43.202.207.171:8080/api/quiz');
        const data = response.data;
        if (!data?.data?.all) throw new Error('퀴즈 데이터 없음');

        const formattedQuizzes = data.data.all.map((quizItem) => {
          const question = quizItem.Question;
          const choices = quizItem.AnswerSet.map((a) => a.content);
          const answer =
            quizItem.AnswerSet.find((a) => a.isCorrect === 1)?.content || '';
          return { question, choices, answer };
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
    if (!quizzes.length || showResult) return;

    if (timerMs < 5000 && !isAnswerPhase) {
      const interval = setInterval(() => {
        setTimerMs((ms) => ms + 100);
      }, 100);
      return () => clearInterval(interval);
    }

    if (timerMs >= 5000 && !isAnswerPhase) {
      handleAutoSubmit();
    }
  }, [timerMs, showResult, isAnswerPhase, quizzes, currentIndex]);

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
      {!allow && (
        <EyesLayout>
          <div className={styles.quizIntroBox}>
            <p className={styles.quizLine1}>
              화면을 보고 간단한 퀴즈를 풀고 있어주세요.
            </p>
            <p className={styles.quizLine2}>깜빡이가 눈 분석을 하고있어요!</p>
            <div
              className={styles.quizButton}
              onClick={() => setIsCaptureDone(false)}
            >
              <img src={quiz} alt="퀴즈 아이콘" />
              퀴즈
            </div>
          </div>
        </EyesLayout>
      )}
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
        <Header isHome={true} />
        <CameraCapture allow={allow} setAllow={setAllow} />
        {isQuizFinished && !isResultShown ? (
          <div className={styles.quizEndWrapper}>
            <img
              src={quiz_end}
              alt="퀴즈 종료"
              className={styles.quizEndImage}
            />
            <p className={styles.quizEndText}>퀴즈가 끝났어요.</p>
          </div>
        ) : isResultShown ? (
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
        ) : (
          allow(
            <div className={styles.quizBox}>
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
                        <span className={styles.numberPrefix}>{index + 1}</span>
                        {choice}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      {!isQuizFinished && (
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

      {showResult && (
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

      {isResultShown && (
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
