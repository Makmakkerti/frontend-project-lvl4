/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push({
        ...payload.attributes,
      });
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((c) => c.id !== payload.id);
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((c) => (c.id === payload.attributes.id));
      channel.name = payload.attributes.name;
    },
    selectChannel: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
