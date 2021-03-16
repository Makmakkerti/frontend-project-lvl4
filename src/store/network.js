/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'network',
  initialState: { error: null, sending: false },
  reducers: {
    setError: () => ({ error: true }),
    setDefaults: () => ({ error: null }),
    setSending: (network, { payload }) => {
      network.sending = payload.sending;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
