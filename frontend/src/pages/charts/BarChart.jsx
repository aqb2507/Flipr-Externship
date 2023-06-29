import React from 'react';
import moment from 'moment';
import { Chart } from 'react-google-charts';

const BarChart = ({ data }) => {
  const getWeekDates = () => {
    const today = moment();
    const startOfWeek = today.clone().startOf('week');
    const endOfWeek = today.clone().endOf('week');
    const dates = [];
    let currentDate = startOfWeek.clone();

    while (currentDate.isSameOrBefore(endOfWeek, 'day')) {
      if (currentDate.isoWeekday() <= 6) {
        dates.push(currentDate.format('YYYY-MM-DD'));
      }
      currentDate.add(1, 'day');
    }
    return dates;
  };

  const checkIfSame = (entry, date) => {
    const dbDate = moment(entry).format('YYYY-MM-DD');
    return dbDate === date;
  };

  const weekDates = getWeekDates();

  const weeklyData = [];
  for (let i = 0; i < weekDates.length; i++) {
    weeklyData[i] = [];
    const breaks = data.filter(
      (task) =>
        task.category === 'Break' && checkIfSame(task.start_time, weekDates[i]),
    );
    const workTasks = data.filter(
      (task) =>
        task.category === 'Work' && checkIfSame(task.start_time, weekDates[i]),
    );
    const meetings = data.filter(
      (task) =>
        task.category === 'Meeting' &&
        checkIfSame(task.start_time, weekDates[i]),
    );
    weeklyData[i].push(breaks.length, workTasks.length, meetings.length);
  }

  const barData = [
    ['Day', 'Not Working', 'Working', 'Meeting'],
    ['Monday', weeklyData[0][0], weeklyData[0][1], weeklyData[0][2]],
    ['Tuesday', weeklyData[1][0], weeklyData[1][1], weeklyData[1][2]],
    ['Wednesday', weeklyData[2][0], weeklyData[2][1], weeklyData[2][2]],
    ['Thursday', weeklyData[3][0], weeklyData[3][1], weeklyData[3][2]],
    ['Friday', weeklyData[4][0], weeklyData[4][1], weeklyData[4][2]],
    ['Saturday', weeklyData[5][0], weeklyData[5][1], weeklyData[5][2]],
  ];

  const options = {
    title: 'Activity Overview of this Week so far (in number)',
    titleTextStyle: {
      color: '#1F2937',
      fontName: 'Century Gothic',
      fontSize: 22,
    },
    chartArea: { width: '50%' },
    colors: ['#98DED7', '#00AA9F', '#115E59'],
    isStacked: true,
    hAxis: {
      title: 'Activity Count',
      titleTextStyle: {
        color: '#1F2937',
        fontName: 'Century Gothic',
        fontSize: 18,
      },
      minValue: 0,
    },
    vAxis: {
      title: 'Day',
      titleTextStyle: {
        color: '#1F2937',
        fontName: 'Century Gothic',
        fontSize: 18,
      },
    },
  };

  return (
    <>
      <Chart
        chartType="BarChart"
        data={barData}
        options={options}
        width={'100%'}
        height={'400px'}
      />
    </>
  );
};

export default BarChart;
