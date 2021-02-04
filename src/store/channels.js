import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';
import _ from 'lodash';

const slice = createSlice({
  name: 'channels',
  initialState: [...gon.channels],
  reducers: {
    channelAdded: (channels, action) => {
      channels.push({
        id: _.uniqueId(),
        text: action.payload.text,
      });
    },
  },
});

export const { channelAdded } = slice.actions;
export default slice.reducer;
