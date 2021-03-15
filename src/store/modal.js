import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { opened: false, type: null },
  reducers: {
    closeModal: () => ({ opened: false, type: null }),
    openModal: (state, action) => ({ ...state, opened: true, type: action.payload.type }),
  },
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
