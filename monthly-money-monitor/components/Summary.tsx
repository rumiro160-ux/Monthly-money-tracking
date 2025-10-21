
import React from 'react';

interface SummaryProps {
  income: number;
  totalExpenses: number;
  remainingBalance: number;
}

const SummaryCard: React.FC<{ title: string; amount: number; colorClass: string }> = ({ title, amount, colorClass }) => (
    <div className={`p-4 rounded-lg ${colorClass}`}>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-white">
            {amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
    </div>
);

const Summary: React.FC<SummaryProps> = ({ income, totalExpenses, remainingBalance }) => {
  const balanceColor = remainingBalance >= 0 ? 'bg-gradient-to-r from-blue-500 to-sky-500' : 'bg-gradient-to-r from-amber-500 to-red-500';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard title="Total Income" amount={income} colorClass="bg-gradient-to-r from-green-500 to-emerald-500" />
      <SummaryCard title="Total Spent" amount={totalExpenses} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
      <SummaryCard title="Remaining" amount={remainingBalance} colorClass={balanceColor} />
    </div>
  );
};

export default Summary;
