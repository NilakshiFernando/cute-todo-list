import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/main.css';

const TaskList = ({ tasks, onToggle, onDelete, onAdd }) => {
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [filter, setFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAdd(newTask, selectedCategory);
      setNewTask('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const categories = [
    { id: 'personal', emoji: '🪙', color: '#ffd6e0' },
    { id: 'work', emoji: '💼', color: '#d6e5ff' },
    { id: 'home', emoji: '🏠', color: '#d6ffdf' },
    { id: 'shopping', emoji: '🛒', color: '#fff9d6' },
  ];

  return (
    <div className="task-list">
      <motion.h3 
        style={{ marginBottom: '20px', color: '#ff85a2' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        My Cute Tasks ✨
      </motion.h3>
      
      <motion.form 
        onSubmit={handleSubmit}
        style={{ marginBottom: '30px' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <input
          type="text"
          placeholder="Add a new cute task... ✏️"
          className="cute-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: selectedCategory === cat.id ? cat.color : '#f0f0f0',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.emoji} {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <motion.button
          type="submit"
          className="cute-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Task ⭐
        </motion.button>
      </motion.form>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['all', 'active', 'completed'].map((filt) => (
          <motion.button
            key={filt}
            onClick={() => setFilter(filt)}
            style={{
              background: filter === filt ? '#ff85a2' : '#f0f0f0',
              color: filter === filt ? 'white' : '#666',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05 }}
          >
            {filt === 'all' && 'All ✨'}
            {filt === 'active' && 'Active 🔒'}
            {filt === 'completed' && 'Completed ✅'}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            className="task-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <motion.button
                onClick={() => onToggle(task.id)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${task.completed ? '#6bff93' : '#ddd'}`,
                  background: task.completed ? '#6bff93' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileTap={{ scale: 0.9 }}
              >
                {task.completed && '✓'}
              </motion.button>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#999' : '#333' }}>
                {task.text}
              </span>
              <span className={`task-category category-${task.category}`}>
                {categories.find(c => c.id === task.category)?.emoji} {task.category}
              </span>
            </div>
            
            <div className="task-actions">
              <motion.button
                onClick={() => onDelete(task.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                🗑️
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;