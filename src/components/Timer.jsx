import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../utils/audio';
import '../styles/main.css';

const Timer = ({ mood, onComplete }) => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro');
  const [isMuted, setIsMuted] = useState(false);

  const timerTypes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    // Load sounds
    audioManager.preloadSounds();
    
    return () => {
      // Clean up
      audioManager.stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    // Update background music when mood changes
    if (!audioManager.isPlayingSuccess) {
      audioManager.playMoodMusic(mood);
    }
  }, [mood]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      onComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, time, onComplete]);

  useEffect(() => {
    // Control background music based on timer state
    if (!audioManager.isPlayingSuccess) {
      if (isActive && !isMuted) {
        audioManager.playMoodMusic(mood);
      } else {
        audioManager.pauseBackgroundMusic();
      }
    }
  }, [isActive, isMuted, mood]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    if (!audioManager.isPlayingSuccess && !isMuted) {
      audioManager.playMoodMusic(mood);
    }
  };

  const handlePause = () => {
    setIsActive(false);
    if (!audioManager.isPlayingSuccess) {
      audioManager.pauseBackgroundMusic();
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(timerTypes[timerType]);
    if (!audioManager.isPlayingSuccess) {
      audioManager.stopBackgroundMusic();
    }
  };

  const handleTimerTypeChange = (type) => {
    setTimerType(type);
    setTime(timerTypes[type]);
    setIsActive(false);
    if (!audioManager.isPlayingSuccess) {
      audioManager.stopBackgroundMusic();
    }
  };

  const toggleMute = () => {
    const newMutedState = audioManager.toggleMute();
    setIsMuted(newMutedState);
  };

  return (
    <div className="timer-container">
      <h3 style={{ marginBottom: '20px', color: '#ff85a2' }}>⏰ Study Timer</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(timerTypes).map((type) => (
          <motion.button
            key={type}
            onClick={() => handleTimerTypeChange(type)}
            style={{
              background: timerType === type ? '#ff85a2' : '#f0f0f0',
              color: timerType === type ? 'white' : '#666',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '15px',
              cursor: 'pointer',
              flex: 1
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type === 'pomodoro' && '🍅 Pomodoro'}
            {type === 'shortBreak' && '☕ Short Break'}
            {type === 'longBreak' && '🌴 Long Break'}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="timer-display"
        animate={isActive ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {formatTime(time)}
      </motion.div>
      
      <div className="timer-controls">
        <motion.button
          className="timer-button start-button"
          onClick={isActive ? handlePause : handleStart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </motion.button>
        
        <motion.button
          className="timer-button stop-button"
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔄 Reset
        </motion.button>

        <motion.button
          className="timer-button"
          onClick={toggleMute}
          style={{
            background: isMuted ? '#666' : '#6b93ff'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? '🔇 Muted' : '🔊 Sound On'}
        </motion.button>
      </div>
      
      <motion.div 
        style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '15px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎵</span>
          <span style={{ flex: 1 }}>
            {audioManager.isPlayingSuccess ? '🎉 Playing celebration!' : 
             isMuted ? 'Music is muted' : 
             isActive ? `Playing ${mood} music 🎶` : 'Music paused'}
          </span>
          <motion.span
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={toggleMute}
            animate={isActive && !isMuted && !audioManager.isPlayingSuccess ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {audioManager.isPlayingSuccess ? '🎉' : 
             isMuted ? '🔇' : '🔊'}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default Timer;