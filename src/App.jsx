import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddInfoPage } from './pages/AddInfoPage';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-info" element={<AddInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
