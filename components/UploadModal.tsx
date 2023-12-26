// Required for client component to use React hooks
"use client";

import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";

// UploadModal component
const UploadModal = () => {
  // Allow the use of UploadModal methods from the useUploadModal hook
  const uploadModal = useUploadModal();

  // onChange method accepts an open boolean and closes the upload modal
  // if it was open
  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  }

  // Render the upload modal with defined settings
  return (
    <Modal
      title="Upload Modal Title"
      description="Upload modal description."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      Upload Modal Content
    </Modal>
  );
}

export default UploadModal;
