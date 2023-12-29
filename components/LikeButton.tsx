// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

// LikeButtonProps interface contains a songID string
interface LikeButtonProps {
  songID: string;
}

// LikeButton component accepts a songID string
// from the LikeButtonProps interface
const LikeButton: React.FC<LikeButtonProps> = ({ songID }) => {
  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Extract Supabase session info from useSessionContext hook
  const { supabaseClient } = useSessionContext();

  // Allow the use of AuthModal methods from the useAuthModal hook
  const authModal = useAuthModal();

  // Extract user info from custom useUser hook
  const { user } = useUser();

  // Create state variable to track whether a song has been liked
  const [isLiked, setIsLiked] = useState(false);

  // Check whether a song has been liked using the user_id and song_id columns
  // from the "liked_songs" table in Supabase. Call useEffect any time there's
  // a change in the song ID, user ID or supabaseClient
  useEffect(() => {
    // If there's no user ID value, exit the function
    if (!user?.id) {
      return;
    }

    // Asynchronously try to fetch song data from the "liked_songs" table.
    // Pattern-match with the given user ID and song ID.
    const fetchData = async () => {
      const { data, error } = await supabaseClient.from("liked_songs")
        .select("*").eq("user_id", user.id).eq("song_id", songID).single();

      // If there's no problem fetching song data, set song status to "liked"
      if (!error && data) {
        setIsLiked(true);
      }
    }

    fetchData();
  }, [supabaseClient, songID, user?.id]);

  // Render a different icon depending on whether a song has been liked
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  // Render a like button
  return (
    <button
      className="hover:opacity-75 transition"
      onClick={() => {}}
    >
      <Icon size={25} color={isLiked ? "#22C55E" : "#FFFFFF"} />
    </button>
  );
}

export default LikeButton;
