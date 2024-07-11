import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  let [winPattern, setWinPattern] = useState(null);
  let titleRef = useRef(null);

  const boxRefs = useRef([]);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }

    let newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x";
    } else {
      newData[num] = "o";
    }

    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        setWinPattern(pattern); 
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} alt="cross" />`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} alt="circle" />`;
    }
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setWinPattern(null); 
    titleRef.current.innerHTML = 'by <span>Asutosh 😄</span>';
  };

  const renderWinLine = () => {
    if (!winPattern) return null;

    const winLineClasses = {
      "0,1,2": "win-line row-1",
      "3,4,5": "win-line row-2",
      "6,7,8": "win-line row-3",
      "0,3,6": "win-line col-1",
      "1,4,7": "win-line col-2",
      "2,5,8": "win-line col-3",
      "0,4,8": "win-line diag-1",
      "2,4,6": "win-line diag-2",
    };

    const className = winLineClasses[winPattern.join(",")];

    return <div className={className}></div>;
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}> by <span>Asutosh 😄</span></h1>
      <div className='board'>
        {renderWinLine()} 
        {data.map((box, index) => (
          <div
            key={index}
            className='boxes'
            ref={(el) => (boxRefs.current[index] = el)}
            onClick={(e) => toggle(e, index)}
          >
            {box === "x" ? <img src={cross_icon} alt="cross" /> : box === "o" ? <img src={circle_icon} alt="circle" /> : null}
          </div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
