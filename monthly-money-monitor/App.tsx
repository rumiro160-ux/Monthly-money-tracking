import React, { useState, useMemo } from 'react';
import { Expense, Category } from './types';
import { CATEGORIES } from './constants';
import Summary from './components/Summary';
import ExpenseChart from './components/ExpenseChart';
import ExpenseTable from './components/ExpenseTable';
import IncomeInput from './components/IncomeInput';

const seedExpenses: Omit<Expense, 'id'>[] = [
  { category: Category.HouseBills, name: 'Rent', amount: 1200 },
  { category: Category.HouseBills, name: 'Electricity', amount: 75 },
  { category: Category.Food, name: 'Groceries', amount: 400 },
  { category: Category.Transportation, name: 'Gas', amount: 150 },
  { category: Category.Entertainment, name: 'Movie Night', amount: 50 },
  { category: Category.Other, name: 'Gym Membership', amount: 40 },
];

const generateInitialState = (): Expense[] => {
  const allExpenses: Expense[] = [];
  CATEGORIES.forEach(category => {
    const categoryExpenses = seedExpenses.filter(e => e.category === category);
    for (let i = 0; i < 10; i++) {
      const existingExpense = categoryExpenses[i];
      allExpenses.push({
        id: crypto.randomUUID(),
        category: category,
        name: existingExpense?.name || '',
        amount: existingExpense?.amount || 0,
      });
    }
  });
  return allExpenses;
};


const App: React.FC = () => {
  const [income, setIncome] = useState<number>(3000);
  const [expenses, setExpenses] = useState<Expense[]>(generateInitialState);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const remainingBalance = useMemo(() => {
    return income - totalExpenses;
  }, [income, totalExpenses]);

  const handleExpenseChange = (id: string, field: 'name' | 'amount', value: string | number) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense => {
        if (expense.id === id) {
          const newAmount = field === 'amount' ? Number(value) || 0 : expense.amount;
          const newName = field === 'name' ? String(value) : expense.name;
          return { ...expense, name: newName, amount: newAmount };
        }
        return expense;
      })
    );
  };
  
  const handleExportCSV = () => {
    const csvRows: (string | number)[][] = [];

    // Summary section
    csvRows.push(['Monthly Money Monitor']);
    csvRows.push([]); // Spacer
    csvRows.push(['Monthly Income', income]);
    csvRows.push(['Total Spent', totalExpenses]);
    csvRows.push(['Remaining Balance', remainingBalance]);
    csvRows.push([]); // Spacer

    // Expense tables
    CATEGORIES.forEach(category => {
      csvRows.push([category]); // Category title
      csvRows.push(['Item', 'Amount']); // Column headers
      
      const categoryExpenses = expenses.filter(e => e.category === category);
      
      categoryExpenses.forEach(expense => {
        const amountDisplay = expense.amount === 0 ? '' : expense.amount;
        csvRows.push([expense.name, amountDisplay]);
      });

      csvRows.push([]); // Spacer after each category
    });
    
    // Helper to escape values for CSV
    const formatCsvCell = (cell: string | number): string => {
        const str = String(cell);
        // If the string contains a comma, double quote, or newline, wrap it in double quotes.
        // Also, escape any existing double quotes by replacing them with two double quotes.
        if (/[",\n]/.test(str)) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };
    
    const csvContent = csvRows.map(row => row.map(formatCsvCell).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "monthly_expenses_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Monthly Money Monitor</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Your personal finance dashboard, Excel-style.</p>
          </div>
          <button 
            onClick={handleExportCSV}
            className="mt-4 sm:mt-0 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export to CSV
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <IncomeInput income={income} setIncome={setIncome} />
                <Summary income={income} totalExpenses={totalExpenses} remainingBalance={remainingBalance} />
             </div>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg min-h-[300px]">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Spending Breakdown</h2>
                <ExpenseChart expenses={expenses} />
             </div>
          </div>
          
          {CATEGORIES.map(category => (
            <div key={category} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <ExpenseTable 
                title={category}
                expenses={expenses.filter(e => e.category === category)}
                onExpenseChange={handleExpenseChange}
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;