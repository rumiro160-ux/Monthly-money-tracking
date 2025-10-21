
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense } from '../types';
import { CATEGORY_COLORS, CATEGORIES } from '../constants';

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    const dataByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });

    return CATEGORIES.map(category => ({
      name: category,
      value: dataByCategory[category] || 0,
    })).filter(d => d.value > 0);
  }, [expenses]);

  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">No expenses to display.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Tooltip
          formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            borderColor: '#4b5563',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#f3f4f6' }}
          itemStyle={{ color: '#d1d5db' }}
        />
        <Legend iconType="circle" />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
