import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Link from './Pages/Link';
import Tools from './Pages/Tools';
import ScreenMessage from './Pages/ScreenMessage';
import QRcode from './Pages/QRcode';
import Random from './Pages/Random';
import PdfSide from './Pages/PdfSlide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/link" element={<Link />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/sm" element={<ScreenMessage />} />
        <Route path="/qr" element={<QRcode />} />
        <Route path="/ran/*" element={<Random />} />
        <Route path="/pdf-viewer" element={<PdfSide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
