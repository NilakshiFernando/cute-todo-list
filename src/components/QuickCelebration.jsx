import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../utils/audio';
import '../styles/main.css';

const QuickCelebration = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Quick success sound
    audioManager.playSuccess();
    
    // Very short duration - 1.5 seconds
    const timer = setTimeout(() => {
      handleComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setShow(false);
    if (onComplete) onComplete();
  };

  if (!show) return null;

  return (
    <motion.div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '20px 30px',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(255, 133, 162, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '200px'
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 0.8,
          times: [0, 0.3, 0.6, 1]
        }}
      >
        <motion.div
          style={{ fontSize: '50px', marginBottom: '10px' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          ✅
        </motion.div>
        
        <motion.div
          style={{ fontSize: '1.2rem', color: '#6bff93', fontWeight: 'bold' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Nice!
        </motion.div>
      </motion.div>
      
      {/* Quick confetti */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            background: ['#ff85a2', '#6bff93', '#ffd66b'][i % 3],
            borderRadius: '50%',
            top: '50%',
            left: '50%'
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [1, 0]
          }}
          transition={{
            duration: 1,
            delay: i * 0.05
          }}
        />
      ))}
    </motion.div>
  );
};

export default QuickCelebration;