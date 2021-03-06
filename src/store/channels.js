import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: (channels, action) => {
      channels.push({
        ...action.payload.attributes,
      });
    },
    removeChannel: (channels, action) => channels.filter((c) => c.id !== action.payload.id),
    renameChannel: (channels, { payload: { attributes } }) => {
      const channel = channels.find((c) => (c.id === attributes.id));
      channel.name = attributes.name;
    },
    setActive: (channels, { payload: { id } }) => channels.forEach((ch) => {
      // eslint-disable-next-line no-param-reassign
      ch.active = ch.id === id;
      return ch;
    }),
  },
});

export const { actions } = slice;
export default slice.reducer;
