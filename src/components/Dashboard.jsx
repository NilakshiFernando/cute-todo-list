import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskList from './TaskList';
import MoodSelector from './MoodSelector';
import Timer from './Timer';
import Celebration from './Celebration';
import audioManager from '../utils/audio';
import '../styles/main.css';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy milk', category: 'shopping', completed: false },
    { id: 2, text: 'Water the plants', category: 'home', completed: false },
    { id: 3, text: 'Call grandma', category: 'personal', completed: true },
    { id: 4, text: 'Finish React project', category: 'work', completed: false },
  ]);
  
  const [currentMood, setCurrentMood] = useState('happy');
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [audioState, setAudioState] = useState({
    isMuted: false,
    isPlayingSuccess: false
  });

  useEffect(() => {
    // Preload sounds on component mount
    audioManager.preloadSounds();
    
    // Play background music based on initial mood
    if (!audioManager.isPlayingSuccess) {
      audioManager.playMoodMusic(currentMood);
    }

    // Set up audio state listener
    const updateAudioState = () => {
      const state = audioManager.getPlayingState();
      setAudioState({
        isMuted: state.isMuted,
        isPlayingSuccess: state.isPlayingSuccess
      });
    };

    // Update state periodically
    const interval = setInterval(updateAudioState, 1000);

    return () => {
      clearInterval(interval);
      // Clean up audio on unmount
      audioManager.stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length;
    setCompletedTasks(completed);
  }, [tasks]);

  useEffect(() => {
    // Update background music when mood changes (if not playing success sound)
    if (!audioManager.isPlayingSuccess) {
      audioManager.playMoodMusic(currentMood);
    }
  }, [currentMood]);

  const addTask = (text, category) => {
    const newTask = {
      id: Date.now(),
      text,
      category,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
  const updatedTasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
  
  // Show celebration and play sound if task was just completed
  const task = tasks.find(t => t.id === id);
  if (!task.completed) {
    audioManager.playSuccess();
    setShowCelebration(true);
    // Shorter timeout: 3 seconds instead of 5
    setTimeout(() => {
      if (showCelebration) {
        setShowCelebration(false);
      }
    }, 3000);
  }
};

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCelebrationClose = () => {
    // Make sure success sound is stopped
    audioManager.stopSuccessSound();
    setShowCelebration(false);
  };

  const handleMoodChange = (newMood) => {
    setCurrentMood(newMood);
  };

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {showCelebration && <Celebration onClose={handleCelebrationClose} />}
      </AnimatePresence>

      <motion.div 
        className="dashboard-header"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring" }}
      >
        <div className="user-info">
          <motion.div 
            className="avatar"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '30px'
            }}>
              {currentMood === 'happy' && '😊'}
              {currentMood === 'studying' && '📚'}
              {currentMood === 'focused' && '🎯'}
              {currentMood === 'relaxed' && '🌸'}
              {currentMood === 'energetic' && '⚡'}
            </div>
          </motion.div>
          <div>
            <h2>Hello, {user?.name || 'Cutie'}! 👋</h2>
            <p style={{ 
              color: audioState.isPlayingSuccess ? '#6bff93' : '#666',
              fontWeight: audioState.isPlayingSuccess ? 'bold' : 'normal'
            }}>
              {audioState.isPlayingSuccess ? '🎉 Celebration in progress!' : 'Have a productive day! ✨'}
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            padding: '8px 15px', 
            background: audioState.isPlayingSuccess ? '#fff9d6' : '#f0f0f0',
            borderRadius: '15px',
            fontSize: '0.9rem',
            color: audioState.isPlayingSuccess ? '#ffd66b' : '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>
              {audioState.isPlayingSuccess ? '🎵 Playing celebration' : 
               audioState.isMuted ? '🔇 Muted' : '🔊 Music on'}
            </span>
          </div>
          
          <motion.button
            className="logout-button"
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout 🚪
          </motion.button>
        </div>
      </motion.div>

      <div className="task-container">
        <motion.div 
          className="task-list-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TaskList 
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onAdd={addTask}
          />
          
          <motion.div 
            className="stats-card"
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '20px',
              marginTop: '20px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>📊 Progress</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              <div>
                <p style={{ fontSize: '2rem', color: '#ff85a2' }}>{totalTasks}</p>
                <p>Total</p>
              </div>
              <div>
                <p style={{ fontSize: '2rem', color: '#6bff93' }}>{completedTasks}</p>
                <p>Done ✅</p>
              </div>
              <div>
                <p style={{ fontSize: '2rem', color: '#ffd66b' }}>{activeTasks}</p>
                <p>Left ⏳</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ 
                width: '100%', 
                height: '10px', 
                background: '#f0f0f0', 
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <motion.div 
                  style={{ 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #ff85a2, #6bff93)',
                    width: `${(completedTasks / totalTasks) * 100}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '5px',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <span>{Math.round((completedTasks / totalTasks) * 100)}% Complete</span>
                <span>{activeTasks} to go</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="right-panel"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <MoodSelector 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          
          <Timer 
            mood={currentMood}
            onComplete={() => {
              audioManager.playSuccess();
              setShowCelebration(true);
            }}
          />
          
          <motion.div 
            className="mood-character"
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '25px',
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '80px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              opacity: audioState.isPlayingSuccess ? 0.5 : 1
            }}
            animate={
              audioState.isPlayingSuccess ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : 
              currentMood === 'studying' ? { scale: [1, 1.1, 1] } : 
              currentMood === 'energetic' ? { rotate: [0, 10, -10, 0] } : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {audioState.isPlayingSuccess ? '🎉' : 
             currentMood === 'happy' ? '😊' :
             currentMood === 'studying' ? '📚' :
             currentMood === 'focused' ? '🎯' :
             currentMood === 'relaxed' ? '🌸' : '⚡'}
          </motion.div>
        </motion.div>
      </div>

      <motion.footer 
        style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Made with ❤️ and cute animations | Progress: By Nilakshi Fernando - copyright @ 2026 - {completedTasks}/{totalTasks}
        <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
          {audioState.isPlayingSuccess ? (
            <span style={{ color: '#6bff93', fontWeight: 'bold' }}>
              🎉 Celebration mode active! Background music paused.
            </span>
          ) : (
            <span>Music is playing in {currentMood} mode 🎵</span>
          )}
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Dashboard;