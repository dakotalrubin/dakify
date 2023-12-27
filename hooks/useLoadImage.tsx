import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

// useLoadImage hook accepts a song and displays the associated image file
const useLoadImage = (song: Song) => {
  // Check whether the passed song is valid
  if (!song) {
    return null;
  }

  // Get Supabase client methods from useSupabaseClient hook
  const supabaseClient = useSupabaseClient();

  // Retrieve the passed song's image URL and extract it as imageData
  const { data: imageData } = supabaseClient.storage.from("images")
    .getPublicUrl(song.image_path);

  // Return the image path
  return imageData.publicUrl;
}

export default useLoadImage;
