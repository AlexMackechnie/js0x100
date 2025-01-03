import { useEffect, useState } from "react";

function Square({ squareState, onSquareClick }) {
    return (
        <button className={`board-square ${squareState}`} onClick={onSquareClick}/>
    );
}

function Board({ squares, onNextTurnClick }) {
    const [localSquares, setLocalSquares] = useState(squares);
    useEffect(() => {
        setLocalSquares(squares);
    }, [squares])

    function onSquareClick( rowIndex, colIndex ) {
        const newSquares = localSquares.map(row => [...row]);
        newSquares[rowIndex][colIndex] = "ship";
        setLocalSquares(newSquares);
    }

    return (
        <>
            <div className="board-grid">
                {
                    localSquares.map((row, rowIndex) => {
                        return row.map((col, colIndex) => {
                            return <Square 
                                squareState={col} 
                                onSquareClick={() => onSquareClick(rowIndex, colIndex)} 
                                key={`${rowIndex}${colIndex}`}
                            />
                        })
                    })
                }
            </div>
            <button 
                className="next-turn-button"
                onClick={() => onNextTurnClick(localSquares)}
            >Next Turn</button>
        </>
    );
}

function Game() {
    const [boardStates, setBoardStates] = useState(
        [
            Array(5).fill(null).map(() => Array(5).fill("water")),
            Array(5).fill(null).map(() => Array(5).fill("water")),
        ]
    );
    const [currentPlayer, setCurrentPlayer] = useState(0);

    function onNextTurnClick(currentPlayer, newSquares) {
        let newBoardStates = boardStates.map(row => [...row]);
        newBoardStates[currentPlayer] = newSquares;
        setBoardStates(newBoardStates);
        setCurrentPlayer(1 - currentPlayer);
    }

    function hasPlacedShips(ships) {
        return !ships.every(row => row.every(cell => cell === "water"));
    }

    return (
        <div className="game">
            {
                 !hasPlacedShips(boardStates[currentPlayer]) && (
                    <>
                        <p>Player {currentPlayer + 1}, place your ships!</p>
                        <Board 
                            squares={boardStates[currentPlayer]}
                            onNextTurnClick={
                                (newSquares) => onNextTurnClick(currentPlayer, newSquares)
                            }
                        />
                    </>
                )
            }
        </div>
    );
}

export default function App() {
    return (
        <>
            <h1>Battleships</h1>
            <Game />
        </>
    );
}
