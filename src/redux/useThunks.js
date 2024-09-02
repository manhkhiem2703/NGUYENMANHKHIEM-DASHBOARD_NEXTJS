// userThunks.js
import { 
    fetchUsersRequest, 
    fetchUsersSuccess, 
    fetchUsersFailure, 
    addUserRequest, 
    addUserSuccess, 
    addUserFailure, 
    updateUserRequest, 
    updateUserSuccess, 
    updateUserFailure, 
    deleteUserRequest, 
    deleteUserSuccess, 
    deleteUserFailure 
  } from './userSlice';
  
  // Fetch Users
  export const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
  
  // Add User
  export const addUser = (userData) => async (dispatch) => {
    dispatch(addUserRequest());
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) throw new Error('Failed to add user');
      const data = await response.json();
      dispatch(addUserSuccess(data));
    } catch (error) {
      dispatch(addUserFailure(error.message));
    }
  };
  
  // Update User
  export const updateUser = (userData) => async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) throw new Error('Failed to update user');
      const data = await response.json();
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  
  // Delete User
  export const deleteUser = (userId) => async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Failed to delete user');
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  