import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${API_BASE}/api/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error('❌ Failed to load expenses:', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const deleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      const API_BASE = process.env.REACT_APP_API_URL;
      await axios.delete(`${API_BASE}/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error('❌ Failed to delete expense:', error);
    }
  };

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.description}</td>
                <td>${e.amount}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.category}</td>
                <td>
                  <Link to={`/edit/${e.id}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpensesList;
