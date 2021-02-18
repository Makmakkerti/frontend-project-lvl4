import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (messages, action) => {
      messages.push({
        ...action.payload.attributes,
      });
      return messages;
    },
    removeChannelMessages: (messages, { payload }) => messages
      .filter((m) => m.channelId !== payload.id),
  },
});

export const { actions } = slice;
export default slice.reducer;
