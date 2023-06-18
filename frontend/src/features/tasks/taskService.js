import axios from "axios";

const API_URL = "http://localhost:9000/api/tasks/";

// Create new task
const addTask = async (TaskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.post(API_URL, TaskData, config);

  return response.data;
};

// Get all tasks
const getTasks = async (token, empId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `${empId}`, config);

  return response.data;
};


const taskService = {
  addTask,
  getTasks,
};

export default taskService;
