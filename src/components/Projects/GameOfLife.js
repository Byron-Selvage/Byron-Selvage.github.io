import React, { useState, useCallback, useRef } from 'react';
import CategoryButton from '../Resume/Skills/CategoryButton';

const GRD_SZ = 25;
const CELL_SIZE = 20;
const INTERVAL = 150;

const PRESETS = {
  Blinker: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  Pulsar: [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  ],
  Glider: [
    [0, 1, 1],
    [1, 0, 1],
    [0, 0, 1],
  ],
  Rpentomino: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
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
    Pulsar: false,
    Rpentomino: false,
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
            if (neighbors < 2 || neighbors > 3) {
              newGrid[i][j] = 0;
            }
          } else if (neighbors === 3) {
            newGrid[i][j] = 1;
          }
        }
      }

      return newGrid;
    });

    setTimeout(runSimulation, INTERVAL);
  }, []);

  const setActiveButton = (name) => {
    setActiveButtons({
      Start: false,
      Clear: false,
      Glider: false,
      Blinker: false,
      Test: false,
      Rpentomino: false,
      [name]: true,
    });
  };

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
    const newGrid = Array(GRD_SZ).fill().map(() => Array(GRD_SZ).fill(0));
    const startX = Math.floor(GRD_SZ / 2 - pattern.length / 2);
    const startY = Math.floor(GRD_SZ / 2 - pattern[0].length / 2);

    pattern.forEach((row, i) => {
      row.forEach((cell, j) => {
        newGrid[startX + i][startY + j] = cell;
      });
    });
    setGrid(newGrid);
    setActiveButton(name);
  };

  const toggleSimulation = () => {
    if (isRunning) {
      setIsRunning(false);
      runningRef.current = false;
      setActiveButtons((prev) => ({
        ...prev,
        Start: false,
      }));
    } else {
      setIsRunning(true);
      runningRef.current = true;
      setActiveButtons((prev) => ({
        ...prev,
        Start: true,
      }));
      runSimulation();
    }
  };

  const handleButtonClick = (label) => {
    if (label === 'Start' || label === 'Pause') {
      toggleSimulation();
      setActiveButtons({
        Start: false,
        Clear: false,
        Glider: false,
        Blinker: false,
        Test: false,
        Rpentomino: false,
      });
    } else {
      setActiveButton(label);
      switch (label) {
        case 'Start':
          toggleSimulation();
          break;
        case 'Clear':
          clearGrid();
          break;
        case 'Glider':
        case 'Blinker':
        case 'Pulsar':
        case 'Rpentomino':
          loadPreset(PRESETS[label], label);
          break;
        default:
          break;
      }
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

export default GameOfLife;
