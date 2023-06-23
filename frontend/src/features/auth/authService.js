import axios from 'axios';

const API_URL = 'http://localhost:9000/api/users/';

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Update an existing user
const updateUser = async (userData, token, userId) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
  const response = await axios.put(API_URL + userId, userData, config)
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  updateUser,
  logout,
};

export default authService;
