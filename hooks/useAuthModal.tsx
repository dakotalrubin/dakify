import { create } from "zustand";

// AuthModalStore interface contains an isOpen boolean and two void functions:
// onOpen and onClose
interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
// Create an auth modal and extract the isOpen boolean and the set method
// for the onOpen and onClose functions from the AuthModalStore interface
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useAuthModal;
