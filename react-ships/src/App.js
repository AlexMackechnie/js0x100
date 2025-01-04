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
            {
                onNextTurnClick && (
                    <button 
                        className="next-turn-button"
                        onClick={() => nextTurnSubmit()}
                    >Next Turn</button>
                )
            }
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
    const [winner, setWinner] = useState(null);
    const [shipsArePlaced, setShipsArePlaced] = useState([false, false]);

    useEffect(() => {
        if (cellsAreNotWater(boardStates[currentPlayer])) {
            let newShipsArePlaced = [...shipsArePlaced];
            newShipsArePlaced[currentPlayer] = true;
            setShipsArePlaced(newShipsArePlaced);
        }
    }, [boardStates]);

    useEffect(() => {
        nextTurn();
    }, [shipsArePlaced]);

    useEffect(() => {
        if (!shipsArePlaced[0] || !shipsArePlaced[1]) {
            return;
        }
        for (let i = 0; i < hitBoardStates[currentPlayer].length; i++) {
            for (let j = 0; j < boardStates[1 - currentPlayer][i].length; j++) {
                let hitStatus = hitBoardStates[currentPlayer][i][j];
                let shipStatus = boardStates[1 - currentPlayer][i][j];

                if (shipStatus === "ship" && hitStatus != "hit") {
                    return;
                }
            }
        }
        setWinner(currentPlayer);
    }, [hitBoardStates])

    function nextTurn() {
        setCurrentPlayer(1 - currentPlayer);
    }

    function placeShips(currentPlayer, newSquares) {
        let newBoardStates = boardStates.map(row => [...row]);
        newBoardStates[currentPlayer] = newSquares;
        setBoardStates(newBoardStates);
    }

    function attack(currentPlayer, coord) {
        let newHitBoardStates = hitBoardStates.map(row => [...row]);
        if (boardStates[1 - currentPlayer][coord[0]][coord[1]] === "ship") {
            newHitBoardStates[currentPlayer][coord[0]][coord[1]] = "hit";
        } else {
            newHitBoardStates[currentPlayer][coord[0]][coord[1]] = "miss";
        }
        setHitBoardStates(newHitBoardStates);
    }

    function cellsAreNotWater(ships) {
        return !ships.every(row => row.every(cell => cell === "water"));
    }

    return (
        <div className="game">
            {
                (winner !== null) && (
                    <>
                        <p>Player {currentPlayer + 1} wins!</p>
                        <Board 
                            mode="attack"
                            squares={hitBoardStates[currentPlayer]}
                            onSquareClick={null}
                            onNextTurnClick={null}
                        />
                    </>
                )
            }
            {
                 !(shipsArePlaced[currentPlayer]) && (winner === null) && (
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
                (shipsArePlaced[currentPlayer]) && (winner === null) && (
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
