import React from 'react';
import { motion } from 'framer-motion';
import audioManager from '../utils/audio';
import '../styles/main.css';

const MoodSelector = ({ currentMood, onMoodChange }) => {
  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD6E0', desc: 'Upbeat & cheerful' },
    { id: 'studying', emoji: '📚', label: 'Study', color: '#D6E5FF', desc: 'Focus & concentration' },
    { id: 'focused', emoji: '🎯', label: 'Focus', color: '#D6FFDF', desc: 'Deep work mode' },
    { id: 'relaxed', emoji: '🌸', label: 'Relax', color: '#FFF9D6', desc: 'Calm & peaceful' },
    { id: 'energetic', emoji: '⚡', label: 'Energy', color: '#FFD6FF', desc: 'High energy boost' },
  ];

  const handleMoodChange = (moodId) => {
    // Don't change music if success sound is playing
    if (audioManager.isPlayingSuccess) {
      alert("🎉 Celebration in progress! Please wait a moment to change music.");
      return;
    }
    
    onMoodChange(moodId);
    audioManager.playMoodMusic(moodId);
  };

  const handleVolumeToggle = () => {
    const isNowMuted = audioManager.toggleMute();
    return isNowMuted;
  };

  return (
    <div className="mood-selector-container" style={{ 
      background: 'white', 
      padding: '25px', 
      borderRadius: '25px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      opacity: audioManager.isPlayingSuccess ? 0.7 : 1
    }}>
      <h3 style={{ 
        marginBottom: '20px', 
        color: audioManager.isPlayingSuccess ? '#ffd66b' : '#ff85a2',
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px' 
      }}>
        {audioManager.isPlayingSuccess ? '🎉 Celebration!' : 'Current Mood 🎵'}
        <motion.span
          style={{ fontSize: '1.5rem', cursor: audioManager.isPlayingSuccess ? 'not-allowed' : 'pointer' }}
          onClick={audioManager.isPlayingSuccess ? undefined : handleVolumeToggle}
          whileHover={audioManager.isPlayingSuccess ? undefined : { scale: 1.2 }}
          whileTap={audioManager.isPlayingSuccess ? undefined : { scale: 0.9 }}
        >
          {audioManager.isPlayingSuccess ? '🎉' : 
           audioManager.isMuted ? '🔇' : '🔊'}
        </motion.span>
      </h3>
      
      {audioManager.isPlayingSuccess ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          background: '#fff9d6',
          borderRadius: '15px',
          marginBottom: '15px'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#ffd66b', marginBottom: '10px' }}>
            🎉 Celebration in progress!
          </p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Background music paused. You can change mood after celebration ends.
          </p>
        </div>
      ) : null}
      
      <div className="mood-selector">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            className={`mood-option ${currentMood === mood.id ? 'active' : ''}`}
            onClick={() => handleMoodChange(mood.id)}
            style={{
              background: mood.color,
              border: `3px solid ${currentMood === mood.id ? '#ff85a2' : 'transparent'}`,
              flex: 1,
              cursor: audioManager.isPlayingSuccess ? 'not-allowed' : 'pointer',
              opacity: audioManager.isPlayingSuccess ? 0.6 : 1
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: audioManager.isPlayingSuccess ? 0.6 : 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={audioManager.isPlayingSuccess ? undefined : { scale: 1.05 }}
            whileTap={audioManager.isPlayingSuccess ? undefined : { scale: 0.95 }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {mood.emoji}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{mood.label}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '5px' }}>
              {mood.desc}
            </div>
          </motion.div>
        ))}
      </div>
      
      {!audioManager.isPlayingSuccess && (
        <motion.div 
          style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '15px', fontSize: '0.9rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.span
              animate={currentMood === 'studying' || currentMood === 'focused' ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎵
            </motion.span>
            <span>Playing: {moods.find(m => m.id === currentMood)?.desc} music</span>
            <motion.button
              style={{
                background: '#ff85a2',
                color: 'white',
                border: 'none',
                padding: '5px 15px',
                borderRadius: '10px',
                marginLeft: 'auto',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
              onClick={handleVolumeToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {audioManager.isMuted ? 'Unmute 🔊' : 'Mute 🔇'}
            </motion.button>
          </div>
          
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Volume:</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              onChange={(e) => audioManager.setVolume(e.target.value / 100)}
              style={{ flex: 1, cursor: 'pointer' }}
              disabled={audioManager.isPlayingSuccess}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;