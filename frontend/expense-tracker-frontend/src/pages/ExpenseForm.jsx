import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ExpenseForm = () => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // if present, we’re editing

  // Load existing expense when editing
  useEffect(() => {
    if (!id) return;
    const fetchExpense = async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API_BASE}/api/expenses/${id}`);
        const { description, amount, date, category } = res.data;
        setForm({
          description,
          amount: amount.toString(),
          category,
          date: new Date(date).toISOString().slice(0, 10),
        });
      } catch (error) {
        console.error('❌ Failed to fetch expense:', error);
      }
    };
    fetchExpense();
  }, [id]);

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
      const API_BASE = process.env.REACT_APP_API_URL;

      if (id) {
        await axios.put(`${API_BASE}/api/expenses/${id}`, payload);
      } else {
        await axios.post(`${API_BASE}/api/expenses`, payload);
      }
      navigate('/'); // back to list
    } catch (error) {
      console.error('❌ Submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-6">
        <label className="form-label">Description</label>
        <input
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Amount</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Category</label>
        <input
          className="form-control"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Add'} Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
