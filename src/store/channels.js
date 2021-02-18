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
    renameChannel: (channels, { payload: { attributes } }) => channels
      .map((c) => (c.id !== attributes.id ? c : { ...c, name: attributes.name })),
  },
});

export const { actions } = slice;
export default slice.reducer;
