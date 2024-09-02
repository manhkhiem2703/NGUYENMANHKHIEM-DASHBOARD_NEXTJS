// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    fetchUsersRequest: (state) => {
      state.status = 'loading';
    },
    fetchUsersSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addUserRequest: (state) => {
      state.status = 'loading';
    },
    addUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users.push(action.payload);
    },
    addUserFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.status = 'loading';
    },
    updateUserSuccess: (state, action) => {
      state.status = 'succeeded';
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    updateUserFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.status = 'loading';
    },
    deleteUserSuccess: (state, action) => {
      state.status = 'succeeded';
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    deleteUserFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { 
  addUser, 
  updateUser, 
  deleteUser, 
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
} = userSlice.actions;

export default userSlice.reducer;
