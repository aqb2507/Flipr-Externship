import axios from 'axios';

const API_URL = 'http://localhost:9000/api/users/';

// Create new user
const addUser = async (UserData) => {
  const response = await axios.post(API_URL, UserData);

  return response.data;
};

// Get all Employees
const getEmployees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'employees', config);

  return response.data;
};

const userService = {
  addUser,
  getEmployees,
};

export default userService;
