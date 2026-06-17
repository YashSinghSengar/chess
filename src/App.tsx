import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Chess } from 'chess.js';
import type { Square, Move } from 'chess.js';
import { Piece as ChessPiece } from './Pieces';
import { sounds } from './sounds';
import { getGeminiMove } from './BotEngine';
import './App.css';

type GameMode = 'pvp' | 'bot';

const App: React.FC = () => {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error('Captured Global Error:', e);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:red;padding:20px;z-index:9999;overflow:auto;';
      errorDiv.innerHTML = `<h1>Critical Runtime Error</h1><pre>${e.message}\n${e.error?.stack || ''}</pre>`;
      document.body.appendChild(errorDiv);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const [game, setGame] = useState(() => new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);

  // Bot & Mode State
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [apiKey, setApiKey] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);

  const board = useMemo(() => {
    try {
      const b = [];
      const boardState = game.board();
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          b.push({
            pos: String.fromCharCode(97 + j) + (8 - i) as Square,
            piece: boardState[i][j],
            isDark: (i + j) % 2 === 1
          });
        }
      }
      return b;
    } catch (e) {
      setRuntimeError('Error generating board: ' + (e instanceof Error ? e.message : String(e)));
      return [];
    }
  }, [game]);

  const updateGameStatus = useCallback((g: Chess) => {
    if (g.isGameOver()) {
      setShowGameOver(true);
      sounds.gameOver(!g.isDraw());
    }

    if (g.isCheckmate()) {
      setGameStatus(`CHECKMATE! ${g.turn() === 'w' ? 'Black' : 'White'} wins.`);
    } else if (g.isDraw()) {
      setGameStatus('DRAW!');
    } else if (g.isStalemate()) {
      setGameStatus('STALEMATE!');
    } else if (g.isCheck()) {
      setGameStatus('CHECK!');
      sounds.check();
    } else {
      setGameStatus('');
    }
  }, []);

  const performMove = useCallback((moveInput: any) => {
    try {
      const move = game.move(moveInput);
      if (move) {
        sounds.move();
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setMoveHistory(prev => [...prev, move]);
        setSelectedSquare(null);
        setValidMoves([]);
        updateGameStatus(newGame);
        return true;
      }
    } catch (e) {
      console.error("Move Error:", e);
    }
    return false;
  }, [game, updateGameStatus]);

  // Bot Turn Effect
  useEffect(() => {
    if (gameMode === 'bot' && game.turn() === 'b' && !game.isGameOver() && !isBotThinking && apiKey) {
      const triggerBot = async () => {
        setIsBotThinking(true);
        try {
          const sanHistory = moveHistory.map(m => m.san);
          const bestMove = await getGeminiMove(apiKey, game.fen(), sanHistory);
          if (bestMove) {
            performMove(bestMove);
          }
        } catch (e) {
          setRuntimeError("AI Brain Failure: " + (e instanceof Error ? e.message : String(e)));
        } finally {
          setIsBotThinking(false);
        }
      };
      
      const timeout = setTimeout(triggerBot, 500); // Slight delay for realism
      return () => clearTimeout(timeout);
    }
  }, [game, gameMode, apiKey, isBotThinking, moveHistory, performMove]);

  const onSquareClick = (square: Square) => {
    if (game.isGameOver()) return;
    if (gameMode === 'bot' && game.turn() === 'b') return; // Wait for bot

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }

      const success = performMove({
        from: selectedSquare,
        to: square,
        promotion: 'q'
      });

      if (!success) {
        // Handle invalid click/reselection
        const piece = game.get(square);
        if (piece && piece.color === game.turn()) {
          sounds.click();
          setSelectedSquare(square);
          const moves = game.moves({ square, verbose: true });
          setValidMoves(moves.map(m => m.to));
        } else {
          setSelectedSquare(null);
          setValidMoves([]);
        }
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        sounds.click();
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setValidMoves(moves.map(m => m.to));
      }
    }
  };

  const resetGame = () => {
    sounds.click();
    const newGame = new Chess();
    setGame(newGame);
    setMoveHistory([]);
    setSelectedSquare(null);
    setValidMoves([]);
    setGameStatus('');
    setRuntimeError(null);
    setShowGameOver(false);
    setIsBotThinking(false);
  };

  const capturedPieces = useMemo(() => {
    const initialPieces: Record<string, Record<string, number>> = {
      w: { p: 8, n: 2, b: 2, r: 2, q: 1 },
      b: { p: 8, n: 2, b: 2, r: 2, q: 1 }
    };
    const currentPieces: Record<string, Record<string, number>> = {
      w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
    };
    game.board().flat().forEach(sq => {
      if (sq && sq.type !== 'k') currentPieces[sq.color][sq.type]++;
    });
    const captured: { w: string[], b: string[] } = { w: [], b: [] };
    (['p', 'n', 'b', 'r', 'q'] as const).forEach(type => {
      for (let i = 0; i < initialPieces.w[type] - currentPieces.w[type]; i++) captured.b.push(type);
      for (let i = 0; i < initialPieces.b[type] - currentPieces.b[type]; i++) captured.w.push(type);
    });
    return captured;
  }, [game]);

  const lastMove = moveHistory[moveHistory.length - 1];

  return (
    <div className="app-container">
      <div className="cyber-grid"></div>
      <h1 className="title">Cyber Chess</h1>
      
      <div className="game-layout">
        <div className="main-column">
          <div className="chessboard-wrapper">
            <div className="chessboard">
              {board.map(({ pos, piece, isDark }) => (
                <div
                  key={pos}
                  className={`square ${isDark ? 'dark' : 'light'} 
                    ${selectedSquare === pos ? 'selected' : ''} 
                    ${validMoves.includes(pos) ? 'valid-move' : ''}
                    ${lastMove && (lastMove.from === pos || lastMove.to === pos) ? 'last-move' : ''}
                  `}
                  onClick={() => onSquareClick(pos)}
                >
                  {piece && <ChessPiece type={piece.type} color={piece.color} />}
                </div>
              ))}
            </div>
          </div>
          
          <div className="cyber-panel status-panel" style={{ width: '100%' }}>
            <div className={`turn-indicator ${game.turn() === 'w' ? 'white' : 'black'}`}>
              TURN: {game.turn() === 'w' ? 'WHITE' : 'BLACK'}
              {isBotThinking && <span style={{fontSize: '0.8rem', marginLeft: '10px', color: 'var(--neon-cyan)'}}>(NEURAL ANALYZING...)</span>}
            </div>
            <div className="game-status">{gameStatus}</div>
            <button className="new-game-btn" onClick={resetGame}>New Game</button>
          </div>
        </div>

        <div className="side-column">
          <div className="cyber-panel">
            <div className="panel-header">Game Configuration</div>
            <div className="mode-selector">
              <button 
                className={`mode-btn ${gameMode === 'pvp' ? 'active' : ''}`}
                onClick={() => { sounds.click(); setGameMode('pvp'); }}
              >
                Local PvP
              </button>
              <button 
                className={`mode-btn ${gameMode === 'bot' ? 'active' : ''}`}
                onClick={() => { sounds.click(); setGameMode('bot'); }}
              >
                AI Challenge
              </button>
            </div>
            
            {gameMode === 'bot' && (
              <div className="bot-config-panel">
                <input 
                  type="password"
                  placeholder="ENTER GEMINI API KEY"
                  className="cyber-input"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <div className="bot-status">
                  <div className={`status-dot ${isBotThinking ? 'active' : ''}`}></div>
                  <span>GEMINI NEURAL ENGINE: {apiKey ? 'LINKED' : 'AWAITING KEY'}</span>
                </div>
              </div>
            )}
          </div>

          <div className="cyber-panel">
            <div className="panel-header">Captured Material</div>
            <div className="captured-section">
              <div style={{ color: 'var(--neon-cyan)', marginBottom: '5px', fontSize: '0.8rem' }}>WHITE CAPTURES:</div>
              <div className="captured-pieces">
                {capturedPieces.w.map((type, i) => (
                  <div key={i} className="captured-piece"><ChessPiece type={type} color="b" /></div>
                ))}
              </div>
            </div>
            <div className="captured-section" style={{ marginTop: '15px' }}>
              <div style={{ color: 'var(--neon-purple)', marginBottom: '5px', fontSize: '0.8rem' }}>BLACK CAPTURES:</div>
              <div className="captured-pieces">
                {capturedPieces.b.map((type, i) => (
                  <div key={i} className="captured-piece"><ChessPiece type={type} color="w" /></div>
                ))}
              </div>
            </div>
          </div>

          <div className="cyber-panel history-panel">
            <div className="panel-header">Move History</div>
            <div className="history-list">
              {moveHistory.reduce((acc, move, i) => {
                if (i % 2 === 0) acc.push([move]);
                else acc[acc.length - 1].push(move);
                return acc;
              }, [] as Move[][]).map((pair, i) => (
                <React.Fragment key={i}>
                  <div className="history-item move-num">{i + 1}.</div>
                  <div className="history-item move">{pair[0].san}</div>
                  <div className="history-item move">{pair[1]?.san || ''}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <div className="game-over-title">Mission Terminated</div>
            <div className="game-over-result">{gameStatus || 'Match concluded in a draw.'}</div>
            <button className="game-over-btn" onClick={resetGame}>Reboot Match</button>
          </div>
        </div>
      )}

      {runtimeError && (
        <div style={{ position: 'fixed', bottom: 10, right: 10, color: 'red', background: '#000', padding: 10, border: '1px solid red', zIndex: 10000 }}>
          {runtimeError}
          <button onClick={() => setRuntimeError(null)} style={{marginLeft: '10px', background: 'transparent', color: 'red', border: '1px solid red', cursor: 'pointer'}}>X</button>
        </div>
      )}
    </div>
  );
};

export default App;
