import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

// useOnPlay hook accepts an array of songs and returns an onPlay method
const useOnPlay = (songs: Song[]) => {
  // Create a player instance with default values from the usePlayer hook
  const player = usePlayer();

  // Allow the use of AuthModal methods from the useAuthModal hook
  const authModal = useAuthModal();

  // Create a subscribe modal and enable onOpen and onClose methods
  const subscribeModal = useSubscribeModal();

  // Extract user info from custom useUser hook
  const { user, subscription } = useUser();

  // Handles what happens when the user clicks on a play button
  const onPlay = (id: string) => {
    // If the user isn't logged in, open an auth modal
    if (!user) {
      return authModal.onOpen();
    }

    // Check for subscription status
    // Open a subscribe modal if the user isn't subscribed
    // (Default: allow users to play songs anyway!)
    // if (!subscription) {
    //   return subscribeModal.onOpen();
    // }

    // Give the player the proper song ID
    player.setID(id);

    // Create a smart playlist out of all the songs grouped together
    // in the relevant part of the screen
    player.setIDs(songs.map((song) => song.id));
  }

  return onPlay;
}

export default useOnPlay;
