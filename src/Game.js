import { useState } from 'react';
import Board from './Board';

const INITIAL_HISTORY = [Array(9).fill(null)];
const EMOJI_OPTIONS = ['🐻', '🐰', '🐱', '🦕', '🦀', '🦄', '🐶'];
// players can win these items during the game
const ITEMS_OPTIONS = ['💎', '💰', '🔑', '🌭', '🏆', '🐟'];

/**
 *  maybe TODO:
 * 3x4 boards that are all playable. Once a player wins a game, they get an item
 * Give players their own list of items.
 * which boards are active and which players won which boards
 */
export default function Game() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerOneEmoji, setPlayerOneEmoji] = useState('🍅');
    const [playerTwoEmoji, setPlayerTwoEmoji] = useState('🍌');
    const [hasStarted, setHasStarted] = useState(false);
    const [playerOneIsNext, setPlayerOneIsNext] = useState(true);

    function handlePlay(nextSquares) {
        setBoard(nextSquares);
        setPlayerOneIsNext((previous) => !previous);
    }

    function handleRestart() {
        setBoard(Array(9).fill(null));
        setPlayerOneIsNext(true);
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
                    playerOneIsNext={playerOneIsNext}
                    squares={board}
                    onPlay={handlePlay}
                    playerOneEmoji={playerOneEmoji}
                    playerTwoEmoji={playerTwoEmoji}
                />
            </div>
        </div>
    );
}
