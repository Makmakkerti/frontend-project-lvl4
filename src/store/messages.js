import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
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
  },
});

export const getMessages = createSelector(
  (state) => state.messages,
  (messages) => messages,
);

export const { messageAdded } = slice.actions;
export default slice.reducer;
