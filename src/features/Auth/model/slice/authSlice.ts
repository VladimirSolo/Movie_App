import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signup,
  logout,
} from "../actions/authThunk";

type Status = "idle" | "pending" | "succeeded" | "failed";

export interface User {
  user: {
    uid: string;
  }
  success: Status,
}

const initialState: User = {
  success: "idle",
  user: {
    uid: null,
  },
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.success = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.success = "succeeded";
      state.user.uid = action.payload.uid;
    });
    builder.addCase(login.rejected, (state) => {
      state.success = "failed";
    })
      .addCase(signup.pending, (state) => {
        state.success = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.success = "succeeded";
        state.user.uid = action.payload.uid;
      })
      .addCase(signup.rejected, (state) => {
        state.success = "failed";
      })
      .addCase(logout.pending, (state) => {
        state.success = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.success = "succeeded";
        state.user.uid = null;
      })
      .addCase(logout.rejected, (state) => {
        state.success = "failed";
      });
  },
});

export default authSlice;
