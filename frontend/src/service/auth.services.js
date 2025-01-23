import api from './api';

// Register a new user or captain
const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};

// Login user or captain
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

// Logout user or captain
const logout = async () => {
  try {
    await api.get('/auth/logout');
    return response.data
  } catch (error) {
    throw error.response?.data?.error || 'Logout failed';
  }
};

// Register a new user specifically
const registerUser = async ({ email, name, phone, password }) => {
  return register({
    role: 'user',
    email,
    name,
    phone,
    password
  });
};

// Register a new captain specifically
const registerCaptain = async ({ email, name, phone, password, vehicleType, vehicleNumber, vehicleModel, vehicleColor }) => {
  return register({
    role: 'captain',
    email,
    name,
    phone,
    password,
    vehicleType,
    vehicleNumber,
    vehicleModel,
    vehicleColor
  });
};

// Login as user
const loginUser = async ({ email, password }) => {
  return login({
    role: 'user',
    email,
    password
  });
};

// Login as captain
const loginCaptain = async ({ email, password }) => {
  return login({
    role: 'captain',
    email,
    password
  });
};

const authService = {
  logout,
  registerUser,
  registerCaptain,
  loginUser,
  loginCaptain
};

export default authService;