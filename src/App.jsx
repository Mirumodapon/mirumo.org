import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Link from './Pages/Link';
import Tools from './Pages/Tools';
import ScreenMessage from './Pages/ScreenMessage';
import QRcode from './Pages/QRcode';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
