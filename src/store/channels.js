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
    channelRenamed: (channels, { payload: { attributes } }) => channels
      .map((c) => (c.id !== attributes.id ? c : { ...c, name: attributes.name })),
  },
});

export const { channelAdded, channelRenamed, channelRemoved } = slice.actions;
export default slice.reducer;
