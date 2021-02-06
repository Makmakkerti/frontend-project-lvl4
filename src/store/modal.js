import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { opened: false, modalType: null },
  reducers: {
    closeModal: () => ({ opened: false, modalType: null }),
    openModal: (state, action) => ({ opened: true, modalType: action.payload.modalType }),
  },
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
