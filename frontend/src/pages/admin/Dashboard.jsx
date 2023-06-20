import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEmployees } from '../../features/users/userSlice';
import { getTasks } from '../../features/tasks/taskSlice';
import EmployeeChart from './EmployeeChart';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { employees } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // console.log(submissions.length)
    dispatch(getEmployees());
  }, [user, dispatch, navigate]);

  const onClick = (employee) => {
    dispatch(getTasks({ empId: employee._id }));
  };

  function empTasks(emp) {
    const filteredTasks = tasks.filter((task) => task.creator === emp._id);
    return filteredTasks.length === 0 ? [] : filteredTasks;
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="grid grid-rows-1 mx-2 gap-4 ">
              <div className="grid grid-cols-1 my-10 gap-4">
                <div className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className="flex justify-between">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Employees
                    </h5>
                    <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                      {employees.length}
                    </p>
                  </div>
                  <div
                    id="employees_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {employees?.map((emp) => (
                      <div key={emp._id} onClick={() => onClick(emp)}>
                        <div>
                          <div className="font-semibold text-xl capitalize text-base">
                            {emp.name}
                          </div>
                          <div className="text-xs opacity-50">{emp.dept}</div>
                        </div>
                        <EmployeeChart emp={emp} tasks={empTasks(emp)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
