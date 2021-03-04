import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'network',
  initialState: { error: null },
  reducers: {
    setError: () => ({ error: true }),
    setDefaults: () => ({ error: null }),
  },
});

export const { actions } = slice;
export default slice.reducer;
