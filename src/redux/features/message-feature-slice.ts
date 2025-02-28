import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  name: string;
  isEditing: boolean;
}

const initialState: MessageState = {
  name: "",
  isEditing: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearMessage: () => initialState,

    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setMessage, clearMessage, setEditing } = messageSlice.actions;
export default messageSlice.reducer;
