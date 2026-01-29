import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/main.css';

const SignupPage = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call
    onSignup(formData);
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
          Join Us! 🌟
        </motion.h1>
        
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
            <motion.div
              key={field}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <input
                type={field.includes('password') ? 'password' : 'text'}
                placeholder={
                  field === 'name' ? '👤 Your cute name' :
                  field === 'email' ? '📧 Email address' :
                  field === 'password' ? '🔐 Create password' :
                  '🔏 Confirm password'
                }
                className="cute-input"
                value={formData[field]}
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                required
              />
            </motion.div>
          ))}
          
          <motion.button
            type="submit"
            className="cute-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Create Account 🎉
          </motion.button>
        </form>
        
        <motion.p 
          style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff85a2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Login here! 🌸
          </button>
        </motion.p>
        
        <motion.div 
          className="character-display"
          style={{ textAlign: 'center', marginTop: '30px', fontSize: '60px' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🦄
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;