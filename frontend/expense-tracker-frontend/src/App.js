import React from 'react';
import ExpenseForm from './pages/ExpenseForm';
import ExpensesList from './pages/ExpensesList';

const App = () => {
  const [refresh, setRefresh] = React.useState(false);

  const reloadExpenses = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Expense Tracker</h1>
      <ExpenseForm onSuccess={reloadExpenses} />
      <ExpensesList key={refresh} />
    </div>
  );
};

export default App;
