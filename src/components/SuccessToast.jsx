import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../utils/audio';
import '../styles/main.css';

const SuccessToast = ({ message = "Task Completed!" }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Quick chime sound (shorter version)
    const playQuickSound = () => {
      audioManager.pauseBackgroundMusic();
      const sound = new Howl({
        src: ['/sounds/success-sound.mp3'],
        volume: 0.5,
        html5: true,
        onend: () => {
          audioManager.resumeBackgroundMusic();
        }
      });
      sound.play();
    };

    playQuickSound();
    
    // Auto-dismiss after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <motion.div
            style={{
              background: 'linear-gradient(135deg, #ff85a2, #ff6b93)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(255, 133, 162, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem'
            }}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 0.5,
              times: [0, 0.3, 0.6, 1]
            }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5 }}
            >
              🎉
            </motion.span>
            <span>{message}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;