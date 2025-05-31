import { createSlice } from '@reduxjs/toolkit';
import { recommend, addBook, deleteMybook, myBooks } from '../books/operations.js';

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
      })

      .addCase(deleteMybook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMybook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(book => book._id !== action.payload); 
      })
      .addCase(deleteMybook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(myBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(myBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(myBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
