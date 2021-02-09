import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const slice = createSlice({
  name: 'messages',
  initialState: [...gon.messages],
  reducers: {
    messageAdded: (messages, action) => {
      messages.push({
        ...action.payload.attributes,
      });
      return messages;
    },
    messagesRemoved: (messages, { payload }) => messages.filter((m) => m.channelId !== payload.id),
  },
});

export const { messageAdded, messagesRemoved } = slice.actions;
export default slice.reducer;
