import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import SheetsData from './SheetData';
import Videos from './Videos';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<SheetsData />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </Router>
  );
}

export default App;