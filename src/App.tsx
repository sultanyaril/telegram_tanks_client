import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css"
import MainMenu from "./components/MainMenu";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className={ styles.App }>
          <Routes>
            <Route path="/" element={<MainMenu />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
