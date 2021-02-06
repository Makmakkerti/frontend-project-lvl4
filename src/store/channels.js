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
  },
});

export const { channelAdded } = slice.actions;
export default slice.reducer;
