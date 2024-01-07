// Required for client component to use React hooks
"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import LibraryItem from "./LibraryItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// LibraryProps interface contains an array of user songs
interface LibraryProps {
  songs: Song[];
}

// Library component accepts an array of user songs from LibraryProps interface
const Library: React.FC<LibraryProps> = ({ songs }) => {
  // Create a subscribe modal and enable onOpen and onClose methods
  const subscribeModal = useSubscribeModal();

  // Allow the use of AuthModal methods from the useAuthModal hook
  const authModal = useAuthModal();

  // Allow the use of UploadModal methods from the useUploadModal hook
  const uploadModal = useUploadModal();

  // Extract user info and subscription status from custom useUser hook
  const { user, subscription } = useUser();

  // Pass the song array to the useOnPlay hook for a smart playlist
  const onPlay = useOnPlay(songs);

  // Open a music upload modal
  const onClick = () => {
    // Open an auth modal if the user isn't logged in
    if (!user) {
      return authModal.onOpen();
    }

    // Check for subscription status
    // Open a subscribe modal if the user isn't subscribed
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  // Render the user's music library
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26}/>
          <p className="text-neutral-400 font-medium text-md">
            Your Library
          </p>
        </div>
        <AiOutlinePlus onClick={onClick} size={20} className="text-neutral-400 
          cursor-pointer hover:text-white transition" />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <LibraryItem
            key={item.id}
            data={item}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
