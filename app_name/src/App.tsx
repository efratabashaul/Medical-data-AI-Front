import './index.css';
import './App.css';
import { TellMe } from "./pages/TellMe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResultPageCheck } from './pages/dataForCheck';
import { PageMiss } from './pages/pageMiss';
import { ResultPageChange } from './pages/resultForChange';
import { WaitingPage } from './pages/waitingPage';
import { PageSubmit } from './pages/pageSubmit';

function App() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<TellMe />} />
        <Route path="/check" element={<ResultPageCheck />} />
        <Route path="/pageMiss" element={<PageMiss />} />
        <Route path="/resultChange" element={<ResultPageChange />} />
        <Route path="/loading" element={<WaitingPage />} />
        <Route path="/submit" element={<PageSubmit />} />
        
        {/* ניתן להוסיף עוד ניתובים כאן */}
      </Routes>
    // </BrowserRouter>
  );
}

export default App;