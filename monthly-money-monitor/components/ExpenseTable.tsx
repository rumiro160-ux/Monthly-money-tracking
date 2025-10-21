import React from 'react';
import { Expense, Category } from '../types';

interface ExpenseTableProps {
  title: Category;
  expenses: Expense[];
  onExpenseChange: (id: string, field: 'name' | 'amount', value: string | number) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ title, expenses, onExpenseChange }) => {
  
  const categoryTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <div className="flex-grow overflow-y-auto -mx-6 px-6 border-t border-b border-gray-200 dark:border-gray-700">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Item</th>
              <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <td className="p-0">
                  <input
                    type="text"
                    value={expense.name}
                    onChange={(e) => onExpenseChange(expense.id, 'name', e.target.value)}
                    placeholder="Enter item name..."
                    className="w-full h-full bg-transparent px-3 py-2 focus:bg-gray-100 dark:focus:bg-gray-700/50 outline-none transition-colors"
                  />
                </td>
                <td className="p-0 w-36">
                  <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-400 pointer-events-none">$</span>
                      <input
                        type="number"
                        value={expense.amount === 0 ? '' : expense.amount}
                        onChange={(e) => onExpenseChange(expense.id, 'amount', e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full h-full bg-transparent font-mono text-right pl-7 pr-3 py-2 focus:bg-gray-100 dark:focus:bg-gray-700/50 outline-none transition-colors"
                      />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4">
        <div className="flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>{categoryTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;