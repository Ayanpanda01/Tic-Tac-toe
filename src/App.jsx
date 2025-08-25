import React from 'react'
import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import fireworksAnimation from './fireworks.json';
const App = () => {
  const [value, setValue] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  const winner = calculateWinner(value);

  useEffect(() => {
    if (winner) {
      setShowAnimation(true);
    }
  }, [winner]);

  const handleClick = (index) => {
    if (value[index] || winner) {
      return;
    }
    const newValue = [...value];
    newValue[index] = isNext ? 'X' : 'O';
    setValue(newValue);
    setIsNext(!isNext);
  };

  function calculateWinner(cells) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];//destructuring
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-zinc-800 flex-col gap-4 p-4 overflow-hidden">
      {showAnimation && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <Lottie
            animationData={fireworksAnimation}
            loop={false}
            className="w-full h-full"
            onComplete={() => setShowAnimation(false)}
          />
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {value.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl font-bold border-2 border-gray-300 rounded-lg flex items-center justify-center transition-transform duration-100 ease-in active:scale-95"
            onClick={() => handleClick(index)}
          >
            <span className={`${cell === 'X' ? 'text-blue-500' : 'text-purple-500'}`}>{cell}</span>
          </button>
        ))}
      </div>
      <div className="h-10 flex items-center justify-center">
        {winner ? (
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Winner: {winner}
          </h2>
        ) : value.every(cell => cell) ? (
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            It's a Draw!
          </h2>
        ) : (
          <h2 className={`text-xl sm:text-2xl font-bold ${isNext ? 'text-blue-500' : 'text-purple-500'}`}>
            Next Player: {isNext ? 'X' : 'O'}
          </h2>
        )}
      </div>
      <button className='mt-4 hover:scale-105 transition-all duration-300 px-6 py-2 sm:px-7 sm:py-3 text-white rounded bg-gradient-to-r from-purple-500 to-indigo-500 text-base sm:text-lg font-semibold' onClick={() => { setValue(Array(9).fill(null)); setIsNext(true); setShowAnimation(false); }}>Restart</button>
    </div>
  )
}


export default App