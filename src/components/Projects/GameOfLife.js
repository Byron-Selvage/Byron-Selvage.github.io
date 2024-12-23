import React, { useState, useCallback, useRef } from 'react';
import CategoryButton from '../Resume/Skills/CategoryButton';

// TODO: Fix demo background, fix demo buttons
const GRD_SZ = 25;
const CELL_SIZE = 20;
const INTERVAL = 100;

// Preset patterns
const PRESETS = {
  Glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  Blinker: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  Block: [
    [1, 1],
    [1, 1],
  ],
};

const GameOfLife = () => {
  const [grid, setGrid] = useState(() => Array(GRD_SZ).fill().map(() => Array(GRD_SZ).fill(0)));
  const [isRunning, setIsRunning] = useState(false);
  const [activeButtons, setActiveButtons] = useState({
    Start: false,
    Clear: false,
    Glider: false,
    Blinker: false,
    Block: false,
  });
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const getNeighborCount = (currentGrid, x, y) => {
    let count = 0;
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i !== 0 || j !== 0) {
          const newX = x + i;
          const newY = y + j;
          if (newX >= 0 && newX < GRD_SZ && newY >= 0 && newY < GRD_SZ) {
            count += currentGrid[newX][newY];
          }
        }
      }
    }
    return count;
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      const newGrid = g.map((arr) => [...arr]);

      for (let i = 0; i < GRD_SZ; i += 1) {
        for (let j = 0; j < GRD_SZ; j += 1) {
          const neighbors = getNeighborCount(g, i, j);
          if (g[i][j]) {
            // Cell is alive
            if (neighbors < 2 || neighbors > 3) {
              newGrid[i][j] = 0; // Dies
            }
          } else if (neighbors === 3) {
            newGrid[i][j] = 1; // Becomes alive
          }
        }
      }

      return newGrid;
    });

    setTimeout(runSimulation, INTERVAL);
  }, []);

  const toggleCell = (i, j) => {
    if (!isRunning) {
      const newGrid = grid.map((arr) => [...arr]);
      newGrid[i][j] = grid[i][j] ? 0 : 1;
      setGrid(newGrid);
    }
  };

  const clearGrid = () => {
    setIsRunning(false);
    setGrid(Array(GRD_SZ).fill().map(() => Array(GRD_SZ).fill(0)));
    setActiveButtons((prev) => ({
      ...prev,
      Start: false,
      Clear: true,
    }));
  };

  const loadPreset = (pattern, name) => {
    clearGrid();
    const newGrid = grid.map((arr) => [...arr]);
    const startX = Math.floor(GRD_SZ / 2 - pattern.length / 2);
    const startY = Math.floor(GRD_SZ / 2 - pattern[0].length / 2);

    pattern.forEach((row, i) => {
      row.forEach((cell, j) => {
        newGrid[startX + i][startY + j] = cell;
      });
    });
    setGrid(newGrid);
    setActiveButtons((prev) => ({
      ...prev,
      [name]: true,
      Clear: false,
    }));
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    setActiveButtons((prev) => ({
      ...prev,
      Start: !prev.Start,
    }));
    if (!isRunning) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleButtonClick = (label) => {
    switch (label) {
      case 'Start':
        toggleSimulation();
        break;
      case 'Clear':
        clearGrid();
        break;
      case 'Glider':
      case 'Blinker':
      case 'Block':
        loadPreset(PRESETS[label], label);
        break;
      default:
        break;
    }
  };

  return (
    <div className="game-of-life">
      <div className="controls">
        <CategoryButton
          label={isRunning ? 'Pause' : 'Start'}
          handleClick={handleButtonClick}
          active={activeButtons}
        />
        <CategoryButton
          label="Clear"
          handleClick={handleButtonClick}
          active={activeButtons}
        />
        {Object.keys(PRESETS).map((name) => (
          <CategoryButton
            key={name}
            label={name}
            handleClick={handleButtonClick}
            active={activeButtons}
          />
        ))}
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRD_SZ}, ${CELL_SIZE}px)`,
        }}
      >
        {/* eslint-disable react/no-array-index-key */}
        {grid.map((rows, rowIndex) => rows.map((col, colIndex) => (
          <div
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={() => toggleCell(rowIndex, colIndex)}
            className={`cell ${grid[rowIndex][colIndex] ? 'alive' : ''}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        )))}
        {/* eslint-enable react/no-array-index-key */}
      </div>
    </div>
  );
};

GameOfLife.propTypes = {
  // Add any props if needed
};

export default GameOfLife;
