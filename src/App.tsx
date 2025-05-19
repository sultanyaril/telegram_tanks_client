import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css"
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game/";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className={ styles.App }>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
