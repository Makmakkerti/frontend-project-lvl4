import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    closeModal: () => false,
    openModal: () => true,
  },
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
