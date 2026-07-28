import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import GrowthProof from "./components/GrowthProof";
import Projects from "./components/Projects";
import Books from "./components/Books";
import BooksGallery from "./components/BooksGallery";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import RobotGame from "./components/RobotGame";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/Global.css";
import "./styles/RobotGame.css";

function App() {
  const { pathname } = useLocation();
  const [gameActive, setGameActive] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <NavBar />
      <div className="game-toggle-fixed">
        <div className="game-toggle-row">
          <button
            className={`game-toggle-btn${gameActive ? " game-toggle-btn--on" : ""}`}
            onClick={() => setGameActive((a) => !a)}
            title={gameActive ? "Disable game mode" : "Enable game mode"}
          >
            <span className="game-toggle-dot" />
            game mode
          </button>
          {gameActive && (
            <button
              className="game-info-btn"
              onMouseEnter={() => setShowGameInfo(true)}
              onMouseLeave={() => setShowGameInfo(false)}
            >
              i
            </button>
          )}
        </div>
        {showGameInfo && gameActive && (
          <div className="robot-game-info">
            <div className="robot-game-info-title">how to play</div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">← →</span>
              <span>move</span>
            </div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">space</span>
              <span>jump</span>
            </div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">scroll</span>
              <span>explore</span>
            </div>
            <div className="robot-game-info-goal">collect your scattered brain cells</div>
          </div>
        )}
      </div>
      <SidebarNav />
      <RobotGame active={gameActive} />
      <div id="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <About />
                <GrowthProof />
                <Experience />
                <Projects />
                <Books />
                <Credits />
              </>
            }
          />
          <Route path="/books" element={<BooksGallery />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
