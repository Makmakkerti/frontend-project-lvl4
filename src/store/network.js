import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'network',
  initialState: { error: null, sending: false },
  reducers: {
    networkError: () => ({ error: true, sending: false }),
    networkSending: () => ({ error: null, sending: true }),
    networkDefaults: () => ({ error: null, sending: false }),
  },
});

export const { networkDefaults, networkError, networkSending } = slice.actions;
export default slice.reducer;
