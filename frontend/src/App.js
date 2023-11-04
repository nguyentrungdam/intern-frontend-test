import React, { useState, useEffect } from "react";
import "./App.css";
import jokes from "./data";
import Cookies from "js-cookie";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allJokesViewed, setAllJokesViewed] = useState(false);
  const [usedIndices, setUsedIndices] = useState([0]);
  useEffect(() => {
    if (allJokesViewed) {
      Cookies.set(`allJokesViewed`, "true");
    }
    const check = Cookies.get(`allJokesViewed`);
    if (check) {
      setCurrentIndex("That's all the jokes for today! Come back another day!");
      setAllJokesViewed(true);
    }
  }, [allJokesViewed]);
  const getRandomJokeIndex = () => {
    const remainingIndices = jokes
      .map((_, index) => index)
      .filter((index) => !usedIndices.includes(index));

    if (remainingIndices.length === 0) {
      return -1; // Trả về -1 nếu đã xem hết tất cả mẩu chuyện
    }

    const randomIndex =
      remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
    return randomIndex;
  };

  const handleNextClick = () => {
    if (allJokesViewed) {
      setCurrentIndex("That's all the jokes for today! Come back another day!");
    } else {
      const nextIndex = getRandomJokeIndex();

      if (nextIndex === -1) {
        setAllJokesViewed(true);
        setCurrentIndex(
          "That's all the jokes for today! Come back another day!"
        );
      } else {
        setUsedIndices([...usedIndices, nextIndex]);
        setCurrentIndex(nextIndex);
      }
    }
  };
  const handleLikeClick = () => {
    // Lưu trạng thái "thích" vào cookie cho trò đùa hiện tại.
    if (!allJokesViewed) {
      Cookies.set(`joke-${currentIndex}`, "liked");
    }
    handleNextClick();
  };

  const handleDislikeClick = () => {
    // Lưu trạng thái "không thích" vào cookie cho trò đùa hiện tại.
    if (!allJokesViewed) {
      Cookies.set(`joke-${currentIndex}`, "disliked");
    }
    handleNextClick();
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="App-header">
        <img className="logo-img" src={require("./img/logo.png")} alt="logo" />
        <div className="avatar">
          <div className="avatar-info">
            <div className="font-1">Handicrafted by</div>
            <div className="font-2">Jim HLS</div>
          </div>
          <img
            className="avatar-img"
            src={require("./img/avatar.png")}
            alt="avatar"
          />
        </div>
      </div>

      {/* Banner */}
      <div className="banner">
        <h1>A joke a day keeps the doctor away</h1>
        <span>If you joke wrong way, your teeth have to pay. (Serious)</span>
      </div>

      {/* Joke */}
      <div className="jokes">
        <p>
          {typeof jokes[currentIndex] === "string"
            ? jokes[currentIndex]
            : currentIndex}
        </p>
        <div className="joke-reaction">
          <button onClick={handleLikeClick}>This is Funny!</button>
          <button onClick={handleDislikeClick}>This is not Funny!</button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>
          This website is created as part of Hlsolutions program. The materials
          contained on this website are provided for general
          <br />
          information only and do not consitute any form of advice. HLS assumes
          no responsibility for the accuracy of any partucylar statement and
          <br />
          accepts no liability for any loss or damage which may arise from
          reliance on the information contained on this site.
        </p>
        <span>Copyright 2021 HLS</span>
      </div>
    </div>
  );
}

export default App;
