import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAuthUser, IInitialStateAuth, ISendData, IUserDataSend } from "../../types";


const initialState: IInitialStateAuth = {
  data: null,
  status: null,
  isLoading: false,
  message: null,
};

export const authUser = createAsyncThunk(
  "auth/authUser",
  async ({ email, password, localLoginDate }: IUserDataSend) => {
    try {
      const { data } = await axios.post("/auth", { email, password, localLoginDate });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'reg/registerUser',
  async ({ email, password, userName, localLoginDate, localRegDate }: ISendData) => {
    try {
      const { data } = await axios.post('/reg', {
        email,
        password,
        userName,
        localRegDate,
        localLoginDate
      })
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  },
)

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const { data } = await axios.get("/get-me");
    return data;
  } catch (error: any) {
    console.log(error);
    window.localStorage.removeItem("token");
    document.location.reload()
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.data = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.message = null;
      })
      .addCase(authUser.fulfilled, (state, action: PayloadAction<IAuthUser>) => {
        state.isLoading = false;
        state.status = "resolved";
        state.data = action.payload;
      })
      .addCase(authUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = "rejected";
        state.message = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthUser>) => {
        state.isLoading = false;
        state.status = "resolved";
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = "rejected";
        state.message = action.payload.message;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.message = null;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<IAuthUser>) => {
        state.isLoading = false;
        state.status = "resolved";
        state.data = action?.payload;
      })
      .addCase(getMe.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = "rejected";
        state.message = action.payload;
      });
  },
});
export const checkIsAuth = (state: any) => Boolean(state.auth.data?.token);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
