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

  const loadExpense = async () => {
    const res = await axios.get(`http://localhost:5000/api/expenses/${id}`);
    setForm(res.data);
  };

  useEffect(() => {
    if (id) loadExpense();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, form);
    } else {
      await axios.post("http://localhost:5000/api/expenses", form);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Amount"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {id ? "Update" : "Add"} Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
