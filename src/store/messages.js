import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';
import _ from 'lodash';

const slice = createSlice({
  name: 'messages',
  initialState: [...gon.messages],
  reducers: {
    messageAdded: (messages, action) => {
      messages.push({
        id: _.uniqueId(),
        text: action.payload.text,
      });
    },
  },
});

export const { messageAdded } = slice.actions;
export default slice.reducer;
