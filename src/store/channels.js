/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push({
        ...action.payload.attributes,
      });
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((c) => c.id !== action.payload.id);
    },
    renameChannel: (state, { payload: { attributes } }) => {
      const channel = state.channels.find((c) => (c.id === attributes.id));
      channel.name = attributes.name;
    },
    selectChannel: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
