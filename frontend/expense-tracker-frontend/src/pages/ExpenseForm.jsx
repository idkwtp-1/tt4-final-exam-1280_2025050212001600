import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        description: form.description,
        amount: parseFloat(form.amount),
        category: form.category,
        date: new Date(form.date).toISOString(),
      };

      const API_BASE = process.env.REACT_APP_API_URL || '';
      console.log('Sending:', payload);
      await axios.post(`${API_BASE}/api/expenses`, payload);

      if (onSuccess) onSuccess();
      setForm({ description: '', amount: '', category: '', date: '' });
    } catch (error) {
      console.error('❌ Submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
  <div className="mb-3">
    <input className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <input className="form-control" name="amount" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <input className="form-control" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <input className="form-control" name="date" type="date" value={form.date} onChange={handleChange} required />
  </div>
  <button type="submit" className="btn btn-primary">Add Expense</button>
</form>

  );
};

export default ExpenseForm;
