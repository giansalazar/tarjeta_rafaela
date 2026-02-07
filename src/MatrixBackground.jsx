// src/components/MatrixBackground.jsx
import React, { useRef, useEffect } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Make it take the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters (Japanese Katakana and numbers)
    // You can customize this set if you want specific characters
    const chars = '01'; // Simplified to just 0s and 1s as requested
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // drops[i] is the y-position of the i-th drop
    // (the y-position of the last character of its column)
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1; // Start at the top
    }

    const draw = () => {
      // Semi-transparent black rectangle to fade the previous frames
      // This creates the "falling" effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green characters
      ctx.fillStyle = '#00FF41'; // Bright green for Matrix effect
      ctx.font = `${fontSize}px monospace`;

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Get a random character from the set
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Send the drop back to the top randomly after it has crossed the screen
        // This creates the continuous falling effect
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y-position for the next frame
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33); // Animation speed

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = canvas.width / fontSize;
      if (newColumns > columns) {
        for (let i = columns; i < newColumns; i++) {
          drops[i] = 1;
        }
      } else {
        drops.length = newColumns;
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-background-canvas"></canvas>;
};

export default MatrixBackground;