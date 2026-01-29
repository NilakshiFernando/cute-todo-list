import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import './styles/main.css';
import './styles/animations.css';

function App() {
  const [currentPage, setCurrentPage] = useState('splash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('cuteTodoUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('cuteTodoUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem('cuteTodoUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cuteTodoUser');
    setCurrentPage('login');
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {currentPage === 'splash' && (
          <SplashScreen key="splash" onEnter={() => setCurrentPage('login')} />
        )}
        
        {currentPage === 'login' && (
          <LoginPage 
            key="login"
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentPage('signup')}
          />
        )}
        
        {currentPage === 'signup' && (
          <SignupPage 
            key="signup"
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        )}
        
        {currentPage === 'dashboard' && user && (
          <Dashboard 
            key="dashboard"
            user={user}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;