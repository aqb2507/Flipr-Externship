import React, { useState, useEffect } from "react";
import { Alert, Card, Label, Select, Spinner } from "flowbite-react";
import { LockClosedIcon, ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { addTask, reset } from "../../features/tasks/taskSlice";
import { getEmployees } from "../../features/users/userSlice";

export default function CreateTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector(
      (state) => state.tasks
    );

    const [formData, setFormData] = useState({
      desc: "",
      category: "",
      start_time: new Date(),
      duration: 0,
    });
    const { desc, category, start_time, duration } = formData;
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
  
    useEffect(() => {
      if (isError) {
        setError(message);
      }
    }, [navigate, isSuccess, isError, message, dispatch]);
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const handleDateChange = (date) => {
        setFormData((prevState) => ({
            ...prevState,
            selectedDate: date,
        }));
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      const taskData = {
        desc,
        category,
        start_time,
        duration,
      };
      dispatch(addTask(taskData));
      dispatch(reset());
      if (isSuccess && !isError) {
        setMsg("Task created successfully!");
      }
    };
  
    if (isLoading) {
      return (
        <div className="absolute top-2/4 left-2/4">
          <Spinner aria-label="Default status example" />
        </div>
      );
    }
  
    const ErrorContainer = () => {
      return (
        <Alert color="failure">
          <span>
            <span className="font-medium">Error!</span> {error}
          </span>
        </Alert>
      );
    };
  
    const SuccessContainer = () => {
      return (
        <Alert color="success">
          <span>
            <span className="font-medium">Success!</span> {msg}
          </span>
        </Alert>
      );
    };

  return (
    <>
      <a onClick={() => navigate("/employee/dashboard")}>
        <ArrowLeftCircleIcon
          className="h-10 w-10 absolute m-4 text-teal-500 hover:text-teal-600 cursor-pointer"
          aria-hidden="true"
        />
      </a>
      {/* <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> */}
      <div className="md:w-3/4 min-h-screen items-center justify-center py-12 px-12">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create New Task
        </h5>
        {error ? <ErrorContainer /> : <></>}
        {msg ? <SuccessContainer /> : <></>}
        <form
          className="min-w-full mt-2"
          // encType="multipart/form-data"
          // method="POST"
          onSubmit={onSubmit}
        >
          <div className="mb-6">
            <label
              htmlFor="desc"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Task Description
            </label>
            <input
              type="text"
              id="desc"
              name="desc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              value={desc}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-6">
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="category" value="Select the type" />
              </div>
              <Select
                id="category"
                name="category"
                value={category}
                onChange={onChange}
                required={true}
              >
                <option>Select a type</option>
                <option value="Break"> Break </option>
                <option value="Meeting"> Meeting </option>
                <option value="Work"> Work </option>
              </Select>
            </div>
          </div>
        
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="default_size"
            >
              Start Time
            </label>

            <DateTimePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 datepicker-input"
              placeholder="Select date and time"
              value={start_time}
              onChange={handleDateChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="duration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Duration 
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              value={duration}
              onChange={onChange}
              placeholder="Enter in minutes"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            Create
          </button>
        </form>
      </Card>
    </div>

    </>
  );
}
