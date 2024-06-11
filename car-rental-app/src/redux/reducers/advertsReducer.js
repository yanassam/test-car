import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdverts = createAsyncThunk(
  "adverts/fetchAdverts",
  async () => {
    const response = await axios.get(
      "https://66682b02f53957909ff6e0be.mockapi.io/adverts"
    );
    return response.data;
  }
);

const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdverts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default advertsSlice.reducer;
