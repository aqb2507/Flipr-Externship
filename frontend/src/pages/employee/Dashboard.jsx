import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getTasks } from '../../features/tasks/taskSlice';
import PieChart from '../charts/PieChart';
import PieChart2 from '../charts/PieChart2';
import BarChart from '../charts/BarChart';

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // console.log(tasks.length)
    dispatch(getTasks({ empId: user._id }));
  }, [user, dispatch, navigate]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto flex justify-between max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <a
            className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            href="./tasks"
          >
            Add Task
          </a>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="grid grid-cols-1 mx-2 gap-6 md:grid-cols-2">
              <PieChart data={tasks} />
              <PieChart2 data={tasks} />
            </div>
          </div>
          <div className="grid grid-rows-1 mx-2 gap-4 ">
            <BarChart data={tasks} />
          </div>
        </div>
      </main>
    </>
  );
}
