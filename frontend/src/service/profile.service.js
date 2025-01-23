import api from './api';

// Get current user profile
const getProfile = async () => {
  try {
    const response = await api.get('/profile/me');
    return response.data.profile;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch profile';
  }
};

// Update user profile
const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/profile/user', userData);
    return response.data.profile;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update profile';
  }
};

// Update captain profile
const updateCaptainProfile = async (captainData) => {
  try {
    const response = await api.put('/profile/captain', captainData);
    return response.data.profile;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update profile';
  }
};

// Change password
const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/profile/change-password', passwordData);
    return response.data.message;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to change password';
  }
};

// Update captain location
const updateCaptainLocation = async (location) => {
  try {
    const response = await api.put('/profile/captain', {
      location: {
        lat: location.lat,
        long: location.long
      }
    });
    return response.data.profile;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update location';
  }
};

// Update captain availability
const updateCaptainAvailability = async (isAvailable) => {
  try {
    const response = await api.put('/profile/captain', {
      isAvailable
    });
    return response.data.profile;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update availability';
  }
};

// Validate vehicle number format
const isValidVehicleNumber = (vehicleNumber) => {
  const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
  return vehicleNumberRegex.test(vehicleNumber);
};

const profileService = {
  getProfile,
  updateUserProfile,
  updateCaptainProfile,
  changePassword,
  updateCaptainLocation,
  updateCaptainAvailability,
  isValidVehicleNumber
};

export default profileService;