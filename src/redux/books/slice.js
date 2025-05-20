import { createSlice } from '@reduxjs/toolkit';
import { recommend, addBook } from '../books/operations.js';

const initialState = {
  items: [],          
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
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
        state.items = action.payload;
      })
      .addCase(recommend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload); 
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
