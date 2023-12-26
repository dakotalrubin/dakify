import { create } from "zustand";

// UploadModalStore interface contains an isOpen boolean and two void functions:
// onOpen and onClose
interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
// Create an upload modal and extract the isOpen boolean and the set method
// for the onOpen and onClose functions from the UploadModalStore interface
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useUploadModal;
