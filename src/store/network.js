/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'network',
  initialState: { error: false, sending: false },
  reducers: {
    setError: () => ({ error: true }),
    setDefaults: () => ({ error: false }),
    setSending: (network, { payload }) => {
      network.sending = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
