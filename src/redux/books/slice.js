import { createSlice } from '@reduxjs/toolkit';
import { recommend } from '../books/operations.js';

const initialState = {
  items: [],          // масив рекомендованих книг
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // можна додати фільтри або локальні дії тут
    clearBooks(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recommend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // переконайся, що API повертає .data
      })
      .addCase(recommend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
