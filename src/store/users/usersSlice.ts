import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { mockUsers } from '../../data/users';

const initialState: { value: User[]; resetPagination: boolean } = {
  value: mockUsers,
  resetPagination: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.value.unshift(action.payload);
      state.resetPagination = true;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.value = state.value.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      );
    },
    resetPaginationFlag: (state) => {
      state.resetPagination = false;
    },
  },
});

export const { addUser, deleteUser, updateUser, resetPaginationFlag } =
  usersSlice.actions;

export default usersSlice.reducer;
