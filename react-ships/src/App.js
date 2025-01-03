import { useEffect, useState } from "react";

function Square({ squareState, onSquareClick }) {
    return (
        <button className={`board-square ${squareState}`} onClick={onSquareClick}/>
    );
}

function Board({ mode, squares, onSquareClick, onNextTurnClick }) {
    const [localSquares, setLocalSquares] = useState(squares);
    useEffect(() => {
        setLocalSquares(squares);
    }, [squares]);

    function onLocalSquareClick( rowIndex, colIndex ) {
        const newSquares = localSquares.map(row => [...row]);
        if (mode === "place") {
            newSquares[rowIndex][colIndex] = "ship";
            setLocalSquares(newSquares);
        } else if (mode === "attack") {
            newSquares[rowIndex][colIndex] = "attacked";
            onSquareClick([rowIndex, colIndex]);
        }
    }

    function nextTurnSubmit() {
        if (mode === "place") {
            onNextTurnClick(localSquares);
        } else if (mode === "attack") {
            onNextTurnClick();
        }
    }

    return (
        <>
            <div className="board-grid">
                {
                    localSquares.map((row, rowIndex) => {
                        return row.map((col, colIndex) => {
                            return <Square 
                                squareState={col} 
                                onSquareClick={() => onLocalSquareClick(rowIndex, colIndex)} 
                                key={`${rowIndex}${colIndex}`}
                            />
                        })
                    })
                }
            </div>
            <button 
                className="next-turn-button"
                onClick={() => nextTurnSubmit()}
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
    const [hitBoardStates, setHitBoardStates] = useState(
        [
            Array(5).fill(null).map(() => Array(5).fill("water")),
            Array(5).fill(null).map(() => Array(5).fill("water")),
        ]
    );
    const [currentPlayer, setCurrentPlayer] = useState(1);

    useEffect(() => {
        nextTurn();
    }, [boardStates]);

    function nextTurn() {
        setCurrentPlayer(1 - currentPlayer);
    }

    function placeShips(currentPlayer, newSquares) {
        let newBoardStates = boardStates.map(row => [...row]);
        newBoardStates[currentPlayer] = newSquares;
        setBoardStates(newBoardStates);
    }

    function attack(currentPlayer, coord) {
        console.log(`${currentPlayer} has attacked ${coord}.`);
        let newHitBoardStates = hitBoardStates.map(row => [...row]);
        newHitBoardStates[currentPlayer][coord[0]][coord[1]] = "attacked";
        setHitBoardStates(newHitBoardStates);
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
                            mode="place"
                            squares={boardStates[currentPlayer]}
                            onSquareClick={null}
                            onNextTurnClick={
                                (newSquares) => placeShips(currentPlayer, newSquares)
                            }
                        />
                    </>
                )
            }
            {
                hasPlacedShips(boardStates[currentPlayer]) && (
                    <>
                        <p>Player {currentPlayer + 1}, attack!</p>
                        <Board 
                            mode="attack"
                            squares={hitBoardStates[currentPlayer]}
                            onSquareClick={
                                (coords) => attack(currentPlayer, coords)
                            }
                            onNextTurnClick={nextTurn}
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
