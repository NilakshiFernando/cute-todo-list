import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/main.css';

const LoginPage = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ email: formData.email });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-box"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1 
          className="auth-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back! 🌸
        </motion.h1>
        
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              placeholder="📧 Your email"
              className="cute-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              placeholder="🔐 Password"
              className="cute-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </motion.div>
          
          <motion.button
            type="submit"
            className="cute-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in... ✨' : 'Login 🎀'}
          </motion.button>
        </form>
        
        <motion.p 
          style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignup}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff85a2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Sign up here! ✨
          </button>
        </motion.p>
        
        <motion.div 
          className="character-display"
          style={{ textAlign: 'center', marginTop: '30px', fontSize: '60px' }}
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🐱
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;