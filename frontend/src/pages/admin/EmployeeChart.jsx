import React from 'react';
import PieChart2 from '../charts/PieChart2';
import BarChart from '../charts/BarChart';

export default function EmployeeChart({ emp, tasks }) {
  return (
    <div>
      <div className="grid grid-cols-1 mx-2 gap-6 md:grid-cols-2">
        <PieChart2 data={tasks} />
        <BarChart data={tasks} />
      </div>
    </div>
  );
}
