import { create } from "zustand";

// PlayerStore interface contains an array of strings called ids, an optional
// activeID string, and three methods: setID, setIDs and reset
interface PlayerStore {
  ids: string[];
  activeID?: string;
  setID: (id: string) => void;
  setIDs: (id: string[]) => void;
  reset: () => void;
}

// Custom usePlayer hook accepts an array of strings called ids, an optional
// activeID string, and three methods from the PlayerStore interface: setID,
// setIDs and reset
const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeID: undefined,
  setID: (id: string) => set({ activeID: id }),
  setIDs: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeID: undefined })
}))

export default usePlayer;
