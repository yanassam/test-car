import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LIMIT = 12;

export const fetchAdverts = createAsyncThunk(
  "adverts/fetchAdverts",
  async (page = 1) => {
    const response = await axios.get(
      `https://66682b02f53957909ff6e0be.mockapi.io/adverts?page=${page}&limit=${LIMIT}`
    );
    return response.data;
  }
);

const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    items: [],
    currentPage: 1,
    status: "idle",
    error: null,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdverts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.concat(action.payload);
        state.currentPage += 1;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default advertsSlice.reducer;
