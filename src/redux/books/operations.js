import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../common/axiosConfig.js";

export const recommend = createAsyncThunk(
    "books/recommend",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/books/recommend");
            console.log(response.data.results)
            return response.data.results;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addBook = createAsyncThunk(
  "books/add/{id}",
  async ({_id, ...bookData}, thunkAPI) => {
    try {
      const response = await axios.post(`/books/add/${_id}`, bookData);
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
            const response = await axios.get("/books/own");
            console.log(response.data,"ogoo")
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
