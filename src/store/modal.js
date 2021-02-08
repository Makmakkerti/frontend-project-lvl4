import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { opened: false, modalType: null, inputText: '' },
  reducers: {
    closeModal: () => ({ opened: false, modalType: null, inputText: '' }),
    openModal: (state, action) => ({ opened: true, modalType: action.payload.modalType }),
    updateInput: (state, action) => ({ ...state, inputText: action.payload.inputText }),
  },
});

export const { openModal, closeModal, updateInput } = slice.actions;
export default slice.reducer;
