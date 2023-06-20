import React from 'react';
import moment from 'moment';
import { Chart } from 'react-google-charts';
import { Alert } from 'flowbite-react';

const PieChart2 = ({ data }) => {
  const checkIfToday = (entry, date) => {
    const dbDate = moment(entry).format('YYYY-MM-DD');
    return dbDate === date;
  };

  const today = moment().format('YYYY-MM-DD');

  const breaks = data.filter(
    (task) => task.category === 'Break' && checkIfToday(task.start_time, today),
  );
  const meetings = data.filter(
    (task) =>
      task.category === 'Meeting' && checkIfToday(task.start_time, today),
  );
  const workTasks = data.filter(
    (task) => task.category === 'Work' && checkIfToday(task.start_time, today),
  );
  const total = breaks.length + meetings.length + workTasks.length;

  const pieData = [
    ['Activity', 'Frequency'],
    ['Break', breaks.length],
    ['Work', workTasks.length],
    ['Meeting', meetings.length],
  ];

  const options = {
    title: "Today's Activity Status",
    is3D: true,
    colors: ['#98DED7', '#00AA9F', '#115E59'],
  };

  const ErrorContainer = () => {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">
            No Activity found corresponding to Today!
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

export default PieChart2;
