import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${API_BASE}/api/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error('❌ Failed to load expenses:', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul>
          {expenses.map((exp) => (
            <li key={exp.id}>
              {exp.description} - ${exp.amount} - {exp.category} -{' '}
              {new Date(exp.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesList;
