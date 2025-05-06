import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseList from "./pages/ExpenseList";
import ExpenseForm from "./pages/ExpenseForm";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Expense Tracker</h1>
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add" element={<ExpenseForm />} />
          <Route path="/edit/:id" element={<ExpenseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
