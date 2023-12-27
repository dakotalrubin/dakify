// Required for client component to use React hooks
"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";

// UploadModal component extracts useUploadModal and useForm methods
// and renders the upload modal so users can post their own music files
const UploadModal = () => {
  // Extract user info from custom useUser hook
  const { user } = useUser();

  // Allow the use of UploadModal methods from the useUploadModal hook
  const uploadModal = useUploadModal();

  // Get Supabase client methods from useSupabaseClient hook
  const supabaseClient = useSupabaseClient();

  // Get router methods from useRouter hook
  const router = useRouter();

  // Create variable to track loading state
  const [isLoading, setIsLoading] = useState(false);

  // Extract properties from the useForm hook with given default values
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
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
  // using SubmitHandler and passed values (title, author, song and image)
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Try to upload the user's song to Supabase and display errors
    try {
      // Update loading state
      setIsLoading(true);

      // Extract image and song file
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      // Check whether there's an active user, an image file and a song file.
      // If there's an error, show an error toast and return from the
      // onSubmit method.
      if (!user || !imageFile || !songFile) {
        toast.error("Missing fields!");
        return;
      }

      // Ensure every song upload has a unique ID
      const uniqueID = uniqid();

      // Upload the user's song to Supabase storage!
      // Extract song data and error attributes from supabaseClient's "songs"
      // bucket after uploading the song with the unique ID generated earlier.
      // The "cacheControl" option caches the song in the web browser and the
      // Supabase CDN for 3600 seconds. The "upsert" option throws an error
      // if the song already exists in the database when set to "false".
      const {
        data: songData,
        error: songError,
      } = await supabaseClient.storage.from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });

      // If problem occurs during song upload, deload and show an error message
      if (songError) {
        setIsLoading(false);
        const songErrorMessage = toast.error("Song upload to database failed!");
        return songErrorMessage;
      }

      // Upload the user's image to Supabase storage!
      // Extract image data and error attributes from supabaseClient's "images"
      // bucket after uploading the image with the unique ID generated earlier.
      // The "cacheControl" option caches the image in the web browser and the
      // Supabase CDN for 3600 seconds. The "upsert" option throws an error
      // if the image already exists in the database when set to "false".
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient.storage.from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false
        });

      // If problem occurs during image upload, deload and show an error message
      if (imageError) {
        setIsLoading(false);
        const imageErrorMessage = toast.error("Image upload to database failed!");
        return imageErrorMessage;
      }

      // Use an SQL insert query to write to the "songs" table in the database
      // with given attributes
      const {
        error: insertError
      } = await supabaseClient.from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      // If problem occurs during song insert, deload and show an error message
      if (insertError) {
        setIsLoading(false);
        const insertErrorMessage = toast.error(insertError.message);
        return insertErrorMessage;
      }

      // Refresh page to update the song list, deload, display success message
      router.refresh();
      setIsLoading(false);
      toast.success("Song added!");

      // Reset the song upload form and close the upload modal
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error("Upload process failed!");

    } finally {
      // Update loading state to false afterwards no matter what
      setIsLoading(false);
    }
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
          id="author"
          placeholder="Artist"
          disabled={isLoading}
          {...register("author", { required: true})}
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
          Add Song
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;
