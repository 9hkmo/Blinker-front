import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddInfoPage } from './pages/AddInfoPage';
import './styles/global.scss';
import { ResultPage } from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/report" element={<AddInfoPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
