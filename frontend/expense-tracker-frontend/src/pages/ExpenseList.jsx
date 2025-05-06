import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div>
      <Link
        to="/add"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Expense
      </Link>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">{e.description}</td>
              <td className="p-2">${e.amount}</td>
              <td className="p-2">{new Date(e.date).toLocaleDateString()}</td>
              <td className="p-2">{e.category}</td>
              <td className="p-2">
                <Link to={`/edit/${e.id}`} className="text-blue-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => deleteExpense(e.id)}
                  className="text-red-500"
                >
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
