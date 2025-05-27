import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import styles from '../styles/pages/Quiz.module.scss';
import { quizbackground } from '../assets';

export const QuizHomePage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timerMs, setTimerMs] = useState(0);
  const [isAnswerPhase, setIsAnswerPhase] = useState(false);

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
    const autoSelected = selectedChoice ?? currentQuiz.choices[0];
    const isCorrectAnswer = autoSelected === currentQuiz.answer;

    setSelectedChoice(autoSelected);
    setIsCorrect(isCorrectAnswer);
    setShowResult(true);
    setIsAnswerPhase(true);

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
      alert('퀴즈를 모두 완료했습니다.');
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
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${quizbackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.overlay} />
        <Header isHome={true} />

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
      </div>

      {/* ✅ 프로그레스바: 하단 고정, 시간 왼쪽 + 바 오른쪽 */}
      <div className={styles.progressWrapper}>
        <div className={styles.progressTime}>{timeLabel}</div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${((5000 - timerMs) / 5000) * 100}%` }}
          />
        </div>
      </div>

      {showResult && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div className={styles.icon}>{isCorrect ? '✅' : '❌'}</div>
            <p className={styles.resultText}>
              {isCorrect
                ? '정답이에요!'
                : `오답이에요. 정답은 ${currentQuiz.answer}입니다.`}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
