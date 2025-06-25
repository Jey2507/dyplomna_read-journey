import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { addBook, addNewBook, deleteMybook, myBooks, recommend } from '../books/operations.js';

const initialState = {
  items: [],
  recommendedItems: [],
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
      })
      .addCase(addNewBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(recommend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedItems = action.payload;
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

const selectBooksState = (state) => state.books.recommendedItems;
const selectFiltersState = (state) => state.filters;

export const selectFilteredBooks = createSelector(
  [selectBooksState, selectFiltersState],
  (books, { title, author }) => {
    return books.filter((book) => {
      const bookTitle = book.title ? book.title.toLowerCase() : '';
      const bookAuthor = book.author ? book.author.toLowerCase() : '';
      const matchesTitle = !title || bookTitle.includes(title.toLowerCase());
      const matchesAuthor = !author || bookAuthor.includes(author.toLowerCase());
      return matchesTitle && matchesAuthor;
    });
  }
);