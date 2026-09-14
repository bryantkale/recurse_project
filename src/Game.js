import { useState } from 'react';
import Board from './Board';

const INITIAL_HISTORY = [Array(9).fill(null)];
const EMOJI_OPTIONS = ['🍅', '🍌', '🍇', '🍓', '🍑', '🍒', '🥝', '🍍'];

export default function Game() {
    const [history, setHistory] = useState(INITIAL_HISTORY);
    const [currentMove, setCurrentMove] = useState(0);
    const [playerOneEmoji, setPlayerOneEmoji] = useState('🍅');
    const [playerTwoEmoji, setPlayerTwoEmoji] = useState('🍌');
    const [hasStarted, setHasStarted] = useState(false);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function handleRestart() {
        setHistory(INITIAL_HISTORY);
        setCurrentMove(0);
    }

    function handleStartGame() {
        if (playerOneEmoji === playerTwoEmoji) {
            return;
        }

        handleRestart();
        setHasStarted(true);
    }

    function handleChangeEmojis() {
        handleRestart();
        setHasStarted(false);
    }

    if (!hasStarted) {
        return (
            <div className="game game-setup">
                <div className="setup-panel">
                    <h1 className="setup-title">Choose your fighter</h1>
                    <div className="emoji-picker-group">
                        <div className="emoji-picker-label">Player 1</div>
                        <div className="emoji-picker-grid">
                            {EMOJI_OPTIONS.map((emoji) => (
                                <button
                                    key={`player-one-${emoji}`}
                                    className={`emoji-option ${playerOneEmoji === emoji ? 'is-selected' : ''}`}
                                    type="button"
                                    onClick={() => setPlayerOneEmoji(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="emoji-picker-group">
                        <div className="emoji-picker-label">Player 2</div>
                        <div className="emoji-picker-grid">
                            {EMOJI_OPTIONS.map((emoji) => (
                                <button
                                    key={`player-two-${emoji}`}
                                    className={`emoji-option ${playerTwoEmoji === emoji ? 'is-selected' : ''}`}
                                    type="button"
                                    onClick={() => setPlayerTwoEmoji(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        className="restart-button"
                        type="button"
                        onClick={handleStartGame}
                        disabled={playerOneEmoji === playerTwoEmoji}
                    >
                        FIGHT!
                    </button>
                    {playerOneEmoji === playerTwoEmoji ? (
                        <p className="setup-warning">Choose two different emojis.</p>
                    ) : null}
                </div>
            </div>
        );
    }

    return (
        <div className="game">
            <div className="game-shell">
                <button className="restart-button" type="button" onClick={handleRestart}>
                    Restart brawl
                </button>
                <button className="restart-button restart-button-secondary" type="button" onClick={handleChangeEmojis}>
                    Change emojis
                </button>
            </div>
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    playerOneEmoji={playerOneEmoji}
                    playerTwoEmoji={playerTwoEmoji}
                />
            </div>
        </div>
    );
}
