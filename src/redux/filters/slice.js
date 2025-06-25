import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTitleFilter(state, action) {
      state.title = action.payload;
    },
    setAuthorFilter(state, action) {
      state.author = action.payload;
    },
    clearFilters(state) {
      state.title = '';
      state.author = '';
    },
  },
});

export const { setTitleFilter, setAuthorFilter, clearFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;