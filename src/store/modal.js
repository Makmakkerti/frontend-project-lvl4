import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { opened: false, type: 'adding' },
  reducers: {
    closeModal: () => ({ opened: false, type: null }),
    openModal: (state) => ({ ...state, opened: true }),
    setModalType: (state, action) => ({ ...state, type: action.payload.type }),
  },
});

export const { openModal, closeModal, setModalType } = slice.actions;
export default slice.reducer;
