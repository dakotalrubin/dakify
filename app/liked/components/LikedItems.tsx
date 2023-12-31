// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import LibraryItem from "@/components/LibraryItem";
import LikeButton from "@/components/LikeButton";

// LikedItemsProps interface contains an array of songs
interface LikedItemsProps {
  songs: Song[];
}

// LikedItems component accepts an array of songs
// from the LikedItemsProps interface
const LikedItems: React.FC<LikedItemsProps> = ({ songs }) => {
  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Extract user data and isLoading status from custom useUser hook
  const { user, isLoading } = useUser();

  // Call useEffect any time user, isLoading or the page route updates
  useEffect(() => {
    // Make sure only authenticated users can navigate to this page.
    // If a user isn't logged in, redirect them to the home page.
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  // Handle the empty playlist case
  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">
        You haven't liked any songs.
      </div>
    );
  }

  // Return the user's list of liked songs
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      {songs.map((song) => (
        <div
          className="flex items-center w-full gap-x-4"
          key={song.id}
        >
          <div className="flex-1">
            <LibraryItem
              data={song}
              onClick={() => {}}
            />
          </div>
          <LikeButton songID={song.id} />
        </div>
      ))}
    </div>
  );
}

export default LikedItems;
