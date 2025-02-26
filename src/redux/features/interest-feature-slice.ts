import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InterestState {
  name: string;
}

const initialState: InterestState = {
  name: "",
};

const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    setInterest: (state, action: PayloadAction<InterestState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearInterest: () => initialState,
  },
});

export const { setInterest, clearInterest } = interestSlice.actions;
export default interestSlice.reducer;
