import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    };
    loadExpenses();
  }, []);

  const deleteExpense = async (id) => {
    await axios.delete(`/api/expenses/${id}`);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Expense
      </Link>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th>Amount ($)</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.description}</td>
              <td>{e.amount}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{e.category}</td>
              <td>
                <Link to={`/edit/${e.id}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>
                <button onClick={() => deleteExpense(e.id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
