import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddInfoPage } from './pages/AddInfoPage';
import './styles/global.scss';
import { ResultPage } from './pages/ResultPage';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { QuizHomePage } from './pages/QuizHomePage';
// import { QuizPage } from './pages/QuizPage';
import { useEffect } from "react";

const API_KEY_KAKAO = import.meta.env.VITE_KAKAO_API_KEY;
// /: 홈페이지
// game: 게임 페이지
// test: 태그 페이지
// quiz: 권한, 퀴즈 페이지
// result: 결과 페이지(post 방식으로 데이터를 보내고 결과를 반환 받을거임. 여기서 데이터 백엔으로 보낼꺼)
function App() {
  useEffect(() => {
    // 이미 초기화됐다면 다시 하지 않음
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(API_KEY_KAKAO);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<AddInfoPage />} />
        <Route path="/quiz" element={<QuizHomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
