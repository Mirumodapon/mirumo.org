import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Store
import { Provider } from 'react-redux';
import store from './Store';

// Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Link from './Pages/Link';
import Tools from './Pages/Tools';
import ScreenMessage from './Pages/Tools/ScreenMessage';
import Clock from './Pages/Tools/Clock';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/link" element={<Link />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/sm" element={<ScreenMessage />} />
          <Route path="/clock" element={<Clock />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
