import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channels';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (messages, { payload }) => messages
        .filter((m) => m.channelId !== payload.id));
  },
});

export const { actions } = slice;
export default slice.reducer;
