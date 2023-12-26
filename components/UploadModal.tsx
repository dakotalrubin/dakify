// Required for client component to use React hooks
"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "./Input";
import Button from "./Button";

// UploadModal component extracts useUploadModal methods
// and renders the upload modal so users can post their own music files
const UploadModal = () => {
  // Allow the use of UploadModal methods from the useUploadModal hook
  const uploadModal = useUploadModal();

  // Create variable to track loading state
  const [isLoading, setIsLoading] = useState();

  // Extract properties from the useForm hook with given default values
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      song: null,
      image: null,
    }
  });

  // onChange method accepts an open boolean and closes the upload modal
  // if it was open
  const onChange = (open: boolean) => {

    // Reset form with default values every time the upload modal is closed
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  // Asynchronously upload the user's song to Supabase storage
  // using SubmitHandler and passed values (title, artist, song and image)
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Try to upload the user's song to Supabase
  }

  // Render the upload modal with a music upload form that has several fields.
  // The "register" prop in the Input components must share the "id" prop value
  // and allows the use of several important props, attributes and methods.
  return (
    <Modal
      title="Add a song!"
      description="Upload an mp3 file."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        className="flex flex-col gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="title"
          placeholder="Song Title"
          disabled={isLoading}
          {...register("title", { required: true})}
        />
        <Input
          id="artist"
          placeholder="Artist"
          disabled={isLoading}
          {...register("artist", { required: true})}
        />
        <div>
          <div className="pb-1">
            Upload Song:
          </div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true})}
          />
        </div>
        <div>
          <div className="pb-1">
            Upload Image:
          </div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true})}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;
