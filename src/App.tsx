import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import FindWord from './pages/FindWord';
import CatchWord from './pages/CatchWord';
import SelectMode from './pages/SelectMode';
import Statics from './pages/Statics';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find-word' element={<FindWord />} />
        <Route path='/catch-word' element={<CatchWord />} />
        <Route path='/select-mode' element={<SelectMode />} />
        <Route path='/statics/' element={<Statics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
