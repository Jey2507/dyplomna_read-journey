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