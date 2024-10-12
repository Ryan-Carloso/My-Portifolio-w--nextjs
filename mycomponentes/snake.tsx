// snake.tsx

"use client";

import { useEffect, useRef } from 'react';

// Snake animation constants and types
const CELL_SIZE = 10;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
const SNAKE_LENGTH = 20;
const MOVE_INTERVAL = 50; // milliseconds

type Point = {
  x: number;
  y: number;
};

const SnakeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let snake: Point[] = Array(SNAKE_LENGTH).fill({ x: 0, y: 0 });
    let direction: Point = { x: 1, y: 0 };
    let target: Point = { x: 0, y: 0 };

    const generateTarget = () => {
      target = {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / CELL_SIZE)) * CELL_SIZE,
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / CELL_SIZE)) * CELL_SIZE
      };
    };

    generateTarget();

    const moveSnake = () => {
      const dx = target.x - snake[0].x;
      const dy = target.y - snake[0].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CELL_SIZE) {
        generateTarget();
      } else {
        direction = {
          x: dx / distance,
          y: dy / distance
        };
      }

      const newHead = {
        x: snake[0].x + direction.x * CELL_SIZE,
        y: snake[0].y + direction.y * CELL_SIZE
      };

      newHead.x = (newHead.x + CANVAS_WIDTH) % CANVAS_WIDTH;
      newHead.y = (newHead.y + CANVAS_HEIGHT) % CANVAS_HEIGHT;

      snake.unshift(newHead);
      snake.pop();
    };

    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      snake.forEach((segment, index) => {
        const alpha = 1 - (index / SNAKE_LENGTH);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(segment.x + CELL_SIZE / 2, segment.y + CELL_SIZE / 2, CELL_SIZE / 2, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    const gameLoop = () => {
      moveSnake();
      drawSnake();
    };

    const intervalId = setInterval(gameLoop, MOVE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={CANVAS_WIDTH} 
      height={CANVAS_HEIGHT} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default SnakeAnimation;
