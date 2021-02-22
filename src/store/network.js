import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'network',
  initialState: { error: null, sending: false },
  reducers: {
    setError: () => ({ error: true, sending: false }),
    setSending: () => ({ error: null, sending: true }),
    setDefaults: () => ({ error: null, sending: false }),
  },
});

export const { actions } = slice;
export default slice.reducer;
