import { create } from "zustand";

// SubscribeModalStore interface contains an isOpen boolean and two functions:
// onOpen and onClose
interface SubscribeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
// Create a subscribe modal and extract the isOpen boolean and the set method
// for the onOpen and onClose functions from the SubscribeModalStore interface
const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSubscribeModal;
