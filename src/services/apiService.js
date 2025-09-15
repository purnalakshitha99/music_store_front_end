import axios from 'axios';

// Create an Axios instance with the base URL of your Spring Boot backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Function to handle user registration
export const registerUser = async (formData) => {
  // Axios will automatically set the Content-Type to multipart/form-data
  // when you pass a FormData object.
  const response = await apiClient.post('/auth/register', formData);
  return response.data;
};

// Function to handle user login
export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

// Fetch the current user's profile using the JWT token
export const getMyProfile = async (token) => {
  const response = await apiClient.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};