import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { getTasks } from "../../features/tasks/taskSlice";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // console.log(tasks.length)
    dispatch(getTasks());
  }, [user, dispatch, navigate]);

  const checkIfYesterday = (day,today) => {
    (day.getDate() === (today.getDate() - 1)) ? true : false;
  }

  const checkIfToday = (entry,today) => {
    (entry.start_time.getDate() === today.getDate()) ? true : false;
  }
  const totaltasks = tasks.length;
  const today = new Date();

  const breaks = tasks.filter(
    (task) =>
      task.category === "Break" 
  );

  const meetings = tasks.filter(
    (task) =>
      task.category === "Meeting" 
  );

  const workTasks = tasks.filter(
    (task) =>
      task.category === "Work" 
  );

  const data = [
    // ["Activity", "Frequency"],
    // ["Break", breaks.length],
    // ["Meeting", meetings.length],
    // ["Work", workTasks.length],
    ["Activity", "Frequency"],
    ["Break", 1],
    ["Meeting", 2],
    ["Work", 3],
  ];

  const options = {
    title: "Activity Status",
    is3D: true,
  };

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
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
