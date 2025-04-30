import { create } from 'zustand';

export type Screen = {
  key: string;
  code: string;
  title: string;
};

type ScreensState = {
  screens: Screen[];
  setScreens: (screens: Screen[]) => void;
};

export const useScreensStore = create<ScreensState>((set) => ({
  screens: [],
  setScreens: (screens) => set({ screens }),
}));
