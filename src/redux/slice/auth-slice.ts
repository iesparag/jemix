import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../service/auth.service";
import { IAuthState } from "../../types/auth.types";

const initialAuthState: IAuthState = {
  isAuthenticated: false,
  userEmail: "",
  loading: false,
  error: false,
  success: false,
  user: {},
  searchUser: [],
  customers: [],
  updatedUsers: [],
  drivers: [],
  noCustomers: 0,
  noDrivers: 0,
};

export const login: any = createAsyncThunk(
  "users/login",
  async (userData: any, thunkAPI) => {
    const response = await authService.loginService(userData);

    if (response) return response;
    throw thunkAPI.rejectWithValue(response);
  }
);

export const register: any = createAsyncThunk(
  "users/register",
  async (userData: any, thunkAPI) => {
    const response = await authService.registerService(userData);

    if (response) return response;
    throw thunkAPI.rejectWithValue(response);
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
