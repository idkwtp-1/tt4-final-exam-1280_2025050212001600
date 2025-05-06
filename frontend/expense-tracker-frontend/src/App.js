import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExpensesList from './pages/ExpensesList';
import ExpenseForm from './pages/ExpenseForm';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="mb-4">
          <Link to="/" className="btn btn-secondary me-2">Home</Link>
          <Link to="/add" className="btn btn-primary">Add Expense</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ExpensesList />} />
          <Route path="/add" element={<ExpenseForm />} />
          <Route path="/edit/:id" element={<ExpenseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
