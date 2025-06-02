import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../common/axiosConfig.js"; // твоя інстанція axios
import toast from "react-hot-toast";


export const recommend = createAsyncThunk(
  "books/recommend",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/books/recommend");
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/add/{id}",
  async ({ _id, ...bookData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.post(`/books/add/${_id}`, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const myBooks = createAsyncThunk(
  "books/own",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.get("/books/own", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMybook = createAsyncThunk(
  "books/delete",
  async (_id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.delete(`/books/remove/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message)
      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const startReading = createAsyncThunk(
  '/books/reading/start',
  async ({ bookId, startPage }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.post(
        '/books/reading/start',
        { "id": bookId, "page": startPage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const stopReading = createAsyncThunk(
  '/books/reading/finish',
  async ({ bookId, endPage }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.post(
        '/books/reading/finish',
        { "id": bookId, "page": endPage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const getBookById = createAsyncThunk(
  "books/getById",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.get(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      toast.error("Failed to fetch book details");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);