import axios from 'axios';

const API_URL = 'http://localhost:9000/api/users/';

// Create new user
const addUser = async (UserData) => {
  const response = await axios.post(API_URL, UserData);

  return response.data;
};

// Delete user
const deleteUser = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + userId, config)

  return response.data
}

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
  deleteUser,
  getEmployees,
};

export default userService;
