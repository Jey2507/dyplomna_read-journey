import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../../common/axiosConfig.js";
import { logoutAction, setUpdatedToken } from "./slice.js";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "users/signup",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", newUser);
      const { name, token } = response.data;
      setAuthHeader(token);
      localStorage.setItem("token", token);
      return { name, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "users/signin",
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.post("/users/signin", userInfo);
      const { name, token, refreshToken} = res.data;
      setAuthHeader(token);
      localStorage.setItem("token", token);
      return { name, token, refreshToken };
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const logout = createAsyncThunk("/users/signout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/signout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken); 
      const res = await axios.get("/users/current"); 
      const { name, token, refreshToken} = res.data;
      return { name, token, refreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateUser = createAsyncThunk(
  "auth/update-User",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.patch("/user/update", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setupAxiosInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.get("/users/current");
          setAuthHeader(data.data.token);
          originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
          store.dispatch(setUpdatedToken(data.accessToken));
          return axios(originalRequest);
          //return axios.request(originalRequest);
        } catch (err) {
          store.dispatch(logoutAction());
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};