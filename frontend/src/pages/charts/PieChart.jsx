import React from 'react';
import moment from 'moment';
import { Chart } from 'react-google-charts';
import { Alert } from 'flowbite-react';

const PieChart = ({ data }) => {
  const checkIfYesterday = (entry, date) => {
    const dbDate = moment(entry).format('YYYY-MM-DD');
    return dbDate === date;
  };

  const prevDay = moment().subtract(1, 'day').format('YYYY-MM-DD');

  const breaks = data.filter(
    (task) =>
      task.category === 'Break' && checkIfYesterday(task.start_time, prevDay),
  );
  const meetings = data.filter(
    (task) =>
      task.category === 'Meeting' && checkIfYesterday(task.start_time, prevDay),
  );
  const workTasks = data.filter(
    (task) =>
      task.category === 'Work' && checkIfYesterday(task.start_time, prevDay),
  );
  const total = breaks.length + meetings.length + workTasks.length;

  const pieData = [
    ['Activity', 'Frequency'],
    ['Break', breaks.length],
    ['Work', workTasks.length],
    ['Meeting', meetings.length],
  ];

  const options = {
    title: "Yesterday's Activity Status",
    is3D: true,
    colors: ['#98DED7', '#00AA9F', '#115E59'],
  };

  const ErrorContainer = () => {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">
            No Activity found corresponding to Yesterday!
          </span>
        </span>
      </Alert>
    );
  };

  const Graph = () => {
    return (
      <Chart
        chartType="PieChart"
        data={pieData}
        options={options}
        width={'100%'}
        height={'400px'}
      />
    );
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {total === 0 ? <ErrorContainer /> : <Graph />}
      </div>
    </>
  );
};

export default PieChart;
