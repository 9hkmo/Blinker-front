import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddInfoPage } from './pages/AddInfoPage';
import './styles/global.scss';
import { ResultPage } from './pages/ResultPage';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
// import { PermissionPage } from './pages/PermissionPage';
import { QuizHomePage } from './pages/QuizHomePage';
// import { QuizPage } from './pages/QuizPage';

// home: 홈페이지
// game: 게임 페이지
// report: 태그 페이지
// permission: 권한 페이지
// quiz: 퀴즈 들어가기전 페이지
// quiz/:id : 퀴즈 페이지(get 방식으로 api 가져오기?)
// result: 결과 페이지(post 방식으로 데이터를 보내고 결과를 반환 받을거임. 여기서 데이터 백엔으로 보낼꺼)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<AddInfoPage />} />
        {/* <Route path="/permission" element={<PermissionPage />} /> */}
        <Route path="/quiz" element={<QuizHomePage />} />
        {/* <Route path="/quiz/:id" element={<QuizPage />} /> */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
