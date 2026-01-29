import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/main.css';
import '../styles/animations.css';

const SplashScreen = ({ onEnter }) => {
  const [character, setCharacter] = useState('😊');

  useEffect(() => {
    const characters = ['😊', '🌟', '🎀', '🐱', '🌸', '🦄'];
    const interval = setInterval(() => {
      setCharacter(characters[Math.floor(Math.random() * characters.length)]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="splash-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="cute-character"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: '100px' }}
      >
        {character}
      </motion.div>
      
      <motion.h1 
        className="splash-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        My Cute To-Do List ✨
      </motion.h1>
      
      <motion.p 
        className="splash-subtitle"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Stay organized with adorable animations and happy vibes! 🎀
      </motion.p>
      
      <motion.button
        className="enter-button"
        onClick={onEnter}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Let's Begin! 🚀
      </motion.button>
      
      <motion.div 
        className="floating-icons"
        style={{ position: 'absolute', bottom: '20px', opacity: 0.5 }}
      >
        {['⭐', '❤️', '🌸', '🎀', '✨'].map((icon, i) => (
          <motion.span
            key={i}
            style={{
              fontSize: '24px',
              margin: '0 10px',
              display: 'inline-block'
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          >
            {icon}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;