import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../types";
import { fetchAuth } from "./asyncActions";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  status: Status.LOADING
}

const authSlice  = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
        state.user = null
        state.status = Status.LOADING
    })
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = Status.SUCCESS
    })
    builder.addCase(fetchAuth.rejected, (state) => {
        state.user = null
        state.status = Status.ERROR
    })
  }
})

export default authSlice.reducer