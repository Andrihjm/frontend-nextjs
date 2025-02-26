import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  username: string | null;
  email: string | null;
  image?: string | null;
  displayName?: string | null;
  gender?: string | null;
  birthday?: string | null;
  horoscope?: string | null;
  zodiac?: string | null;
  height?: number | null;
  weight?: number | null;
}

const initialState: ProfileState = {
  username: null,
  email: null,
  image: null,
  displayName: null,
  gender: null,
  birthday: null,
  horoscope: null,
  zodiac: null,
  height: null,
  weight: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearProfile: () => initialState,
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
