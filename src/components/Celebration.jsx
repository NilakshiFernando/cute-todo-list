import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../utils/audio';
import '../styles/main.css';
import '../styles/animations.css';

const Celebration = ({ onClose }) => {
  const [confetti, setConfetti] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Create fewer confetti particles for shorter celebration
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#ff85a2', '#6bff93', '#ffd66b', '#6b93ff'][Math.floor(Math.random() * 4)],
      size: Math.random() * 8 + 3,
      rotation: Math.random() * 360
    }));
    
    setConfetti(newConfetti);

    // Play success sound (this will auto-pause background music)
    audioManager.playSuccess();

    // Auto-close after 2.5 seconds (much shorter)
    const timer = setTimeout(() => {
      handleClose();
    }, 2500);

    return () => {
      clearTimeout(timer);
      setConfetti([]);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    // Stop success sound if still playing
    audioManager.stopSuccessSound();
    if (onClose) onClose();
  };

  if (!show) return null;

  return (
    <motion.div 
      className="celebration-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
      style={{ cursor: 'pointer' }}
    >
      {confetti.map(particle => (
        <motion.div
          key={particle.id}
          className="confetti"
          style={{
            left: `${particle.x}%`,
            background: particle.color,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            position: 'absolute'
          }}
          animate={{
            y: [0, window.innerHeight],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 180]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: "easeOut"
          }}
        />
      ))}
      
      <motion.div
        style={{ 
          fontSize: '80px',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 10
        }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: [0, 360, 0] 
        }}
        transition={{ 
          duration: 0.8,
          times: [0, 0.8, 1]
        }}
      >
        🎉
      </motion.div>
      
      <motion.h1
        style={{ 
          fontSize: '2rem', 
          color: '#ff85a2',
          textAlign: 'center',
          marginBottom: '15px',
          position: 'relative',
          zIndex: 10
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Great Job! ✨
      </motion.h1>
      
      <motion.p
        style={{ 
          fontSize: '1rem', 
          color: '#666',
          textAlign: 'center',
          marginBottom: '30px',
          position: 'relative',
          zIndex: 10
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Task completed successfully!
      </motion.p>
      
      <motion.button
        style={{
          background: '#ff85a2',
          color: 'white',
          border: 'none',
          padding: '10px 30px',
          fontSize: '1rem',
          borderRadius: '20px',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 10
        }}
        onClick={handleClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Awesome! 🚀
      </motion.button>
      
      <motion.div
        style={{ 
          position: 'absolute', 
          bottom: '20px',
          display: 'flex',
          gap: '15px',
          fontSize: '1.5rem',
          opacity: 0.7
        }}
      >
        {['⭐', '✨', '💖'].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity 
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        style={{
          position: 'absolute',
          bottom: '10px',
          color: '#aaa',
          fontSize: '0.8rem',
          textAlign: 'center',
          width: '100%',
          padding: '0 20px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click anywhere to close immediately
      </motion.p>
    </motion.div>
  );
};

export default Celebration;