
import React from 'react';

interface IncomeInputProps {
  income: number;
  setIncome: (income: number) => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ income, setIncome }) => {
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIncome(Number(value) || 0);
  };

  return (
    <div className="mb-6">
      <label htmlFor="income" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
        Monthly Income
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400 text-lg">$</span>
        <input
          type="number"
          id="income"
          value={income}
          onChange={handleIncomeChange}
          className="w-full pl-8 pr-4 py-3 text-2xl font-semibold bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          placeholder="Enter your income"
        />
      </div>
    </div>
  );
};

export default IncomeInput;
