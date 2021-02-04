import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const slice = createSlice({
  name: 'currentChannel',
  initialState: gon.currentChannelId,
  reducers: {
    selectChannel: (currentChannelId, action) => action.payload.currentChannelId,
  },
});

export const { selectChannel } = slice.actions;
export default slice.reducer;
