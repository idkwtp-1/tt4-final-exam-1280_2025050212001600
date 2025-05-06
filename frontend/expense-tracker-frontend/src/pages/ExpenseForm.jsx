import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ExpenseForm() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/expenses/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/api/expenses/${id}`, form);
    } else {
      await axios.post("/api/expenses", form);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
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
          {id ? "Update" : "Add"} Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
