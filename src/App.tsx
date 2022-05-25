import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import FindWord from './pages/FindWord';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find-word' element={<FindWord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
