import Layout from "./Navbar";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

function App() {
  const newGame = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [board, setBoard] = useState(newGame);
  const [rem, setRem] = useState(9);
  const [turnOfPlus, setTurnOfPlus] = useState(true);
  const [gameover, setGameover] = useState(false);
  const [won, setWon] = useState(0);

  const checkWin = (board, player) => {
    [0, 1, 2].forEach((y) => {
      if (
        (board[0][y] === player) &
        (board[1][y] === player) &
        (board[2][y] === player)
      ) {
        setWon(player);
        setGameover(true);
      }
    });

    [0, 1, 2].forEach((x) => {
      if (
        (board[x][0] === player) &
        (board[x][1] === player) &
        (board[x][2] === player)
      ) {
        setWon(player);
        setGameover(true);
      }
    });

    if (
      (board[0][0] === player) &
      (board[1][1] === player) &
      (board[2][2] === player)
    ) {
      setWon(player);
      setGameover(true);
    }

    if (
      (board[0][2] === player) &
      (board[1][1] === player) &
      (board[2][0] === player)
    ) {
      setWon(player);
      setGameover(true);
    }

    if (rem <= 1) return setGameover(true);
  };

  const handleTurn = (row, col) => {
    if (gameover) return;

    setRem(rem - 1);

    const player = turnOfPlus ? 1 : -1;
    const copy = board;
    copy[row][col] = player;
    setBoard(copy);
    checkWin(copy, player);
    setTurnOfPlus(!turnOfPlus);
  };

  const resetGame = () => {
    setBoard(newGame);
    setTurnOfPlus(!setTurnOfPlus);
    setWon(0);
    setGameover(false);
    setRem(9);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-10">
        {!gameover && !turnOfPlus && (
          <p className="p-2 w-fit mx-auto theme-bg-secondary rounded-xl shadow-xl theme-fc-primary">
            Turn of
            <MinusCircleIcon className="text-blue-500 h-8 w-8 mx-1 p-1 inline" />
          </p>
        )}
        {!gameover && turnOfPlus && (
          <p className="p-2 w-fit mx-auto theme-bg-secondary rounded-xl shadow-xl theme-fc-primary">
            Turn of
            <PlusCircleIcon className="text-red-500 h-8 w-8 mx-1 p-1 inline" />
          </p>
        )}
        {gameover && won === 0 && (
          <p className="p-2 w-fit mx-auto theme-bg-secondary rounded-xl shadow-xl theme-fc-primary">
            Game Over: Tie!
            <span
              onClick={resetGame}
              className="hover:cursor-pointer block underline upperspace text-center text-sm"
            >
              Play again
            </span>
          </p>
        )}
        {gameover && won === -1 && (
          <p className="p-2 w-fit mx-auto theme-bg-secondary rounded-xl shadow-xl theme-fc-primary">
            Game Over:
            <MinusCircleIcon className="text-blue-500  h-8 w-8 mx-1 p-1 inline" />
            won!
            <span
              onClick={resetGame}
              className="hover:cursor-pointer block underline upperspace text-center text-sm"
            >
              Play again
            </span>
          </p>
        )}
        {gameover && won === 1 && (
          <p className="p-2 w-fit mx-auto theme-bg-secondary rounded-xl shadow-xl theme-fc-primary">
            Game Over:
            <PlusCircleIcon className="text-red-500 h-8 w-8 mx-1 p-1 inline" />
            won!
            <span
              onClick={resetGame}
              className="hover:cursor-pointer block underline upperspace text-center text-sm"
            >
              Play again
            </span>
          </p>
        )}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen text-center">
          <div id="game">
            {board.map((row, j) => (
              <span key={j}>
                {row.map((f, i) =>
                  f === 0 ? (
                    <ExclamationCircleIcon
                      onClick={() => handleTurn(j, i)}
                      key={j * 3 + i}
                      className="active opacity-50 text-transparent"
                    />
                  ) : f === 1 ? (
                    <PlusCircleIcon
                      key={j * 3 + i}
                      className="text-red-500 bg-red-300 dark:bg-red-900"
                    />
                  ) : (
                    <MinusCircleIcon
                      key={j * 3 + i}
                      className="text-blue-500 bg-blue-300 dark:bg-blue-900"
                    />
                  )
                )}
                <br />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
