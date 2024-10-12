"use client"

import { useEffect, useRef } from 'react'

// Snake animation constants and types
const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 1000
const SNAKE_LENGTH = 100
const MOVE_INTERVAL = 10 // Aumente o intervalo para um movimento mais suave
const SNAKE_WIDTH = 10
const TURN_RATE = 0.05 // Taxa de curva
const PADDING = 20 // Distância para a curva ao atingir a borda

type Point = {
  x: number
  y: number
}

const SnakeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let snake: Point[] = Array.from({ length: SNAKE_LENGTH }, () => ({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }))
    let target: Point = { x: 0, y: 0 }
    let direction = { x: 0, y: -1 }; // Inicialmente, a cobra se moverá para cima

    const generateTarget = () => {
      target = {
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT
      }
    }

    generateTarget()

    const moveSnake = () => {
      const head = snake[0];
      const dx = target.x - head.x;
      const dy = target.y - head.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) {
        generateTarget();
      }

      // Atualize a direção suavemente
      direction.x += (dx / distance) * TURN_RATE; // Ajuste a direção horizontal
      direction.y += (dy / distance) * TURN_RATE; // Ajuste a direção vertical

      // Normaliza a direção
      const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
      if (length !== 0) {
        direction.x /= length;
        direction.y /= length;
      }

      const newHead = {
        x: head.x + direction.x * 2,
        y: head.y + direction.y * 2
      }

      // Lógica para curvar ao atingir as bordas
      if (newHead.x < PADDING) {
        newHead.x = PADDING;
        direction.x = 1; // Mover para a direita
      } else if (newHead.x > CANVAS_WIDTH - PADDING) {
        newHead.x = CANVAS_WIDTH - PADDING;
        direction.x = -1; // Mover para a esquerda
      }

      if (newHead.y < PADDING) {
        newHead.y = PADDING;
        direction.y = 1; // Mover para baixo
      } else if (newHead.y > CANVAS_HEIGHT - PADDING) {
        newHead.y = CANVAS_HEIGHT - PADDING;
        direction.y = -1; // Mover para cima
      }

      snake.unshift(newHead);
      snake.pop();
    }

    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.moveTo(snake[0].x, snake[0].y);

      for (let i = 1; i < snake.length - 2; i++) {
        const xc = (snake[i].x + snake[i + 1].x) / 2;
        const yc = (snake[i].y + snake[i + 1].y) / 2;
        ctx.quadraticCurveTo(snake[i].x, snake[i].y, xc, yc);
      }

      ctx.quadraticCurveTo(
        snake[snake.length - 2].x,
        snake[snake.length - 2].y,
        snake[snake.length - 1].x,
        snake[snake.length - 1].y
      );

      const gradient = ctx.createLinearGradient(
        snake[0].x,
        snake[0].y,
        snake[snake.length - 1].x,
        snake[snake.length - 1].y
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = SNAKE_WIDTH;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    const gameLoop = () => {
      moveSnake();
      drawSnake();
    }

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
  )
}

export default SnakeAnimation;
