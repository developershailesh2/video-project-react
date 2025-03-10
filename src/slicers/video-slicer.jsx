import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Videos: [],
  VideosCount: 0,
};

const videoSlicer = createSlice({
  name: "VideoSlice",
  initialState,
  reducers: {
    addToWatchLater: (state, action) => {
      state.Videos.push(action.payload);
      state.VideosCount = state.Videos.length;
    },
  },
});

export const { addToWatchLater } = videoSlicer.actions;
export default videoSlicer.reducer;
