import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannel',
  initialState: null,
  reducers: {
    selectChannel: (currentChannelId, action) => action.payload.currentChannelId,
  },
});

export const { selectChannel } = slice.actions;
export default slice.reducer;
