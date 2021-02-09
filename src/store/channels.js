import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const slice = createSlice({
  name: 'channels',
  initialState: [...gon.channels],
  reducers: {
    channelAdded: (channels, action) => {
      channels.push({
        ...action.payload.attributes,
      });
    },
    channelRemoved: (channels, action) => channels.filter((c) => c.id !== action.payload.id),
  },
});

export const { channelAdded, channelRemoved } = slice.actions;
export default slice.reducer;
