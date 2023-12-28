// Required for client component to use React hooks
"use client";

import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";

// LibraryItemProps interface contains song data and an optional onClick method
interface LibraryItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

// LibraryItem component accepts song data and an optional onClick method
// from LibraryItemProps interface
const LibraryItem: React.FC<LibraryItemProps> = ({ data, onClick }) => {
  // Get song image URL from the useLoadImage hook
  const imageURL = useLoadImage(data);

  // If there's an onClick method, pass it the song data id
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // Turn on the song player
    // ...
  }

  // Return a library item in the sidebar
  return (
    <div onClick={handleClick}
      className="flex items-center w-full rounded-md p-2 gap-x-3 cursor-pointer 
        hover:bg-neutral-800/50">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] 
        overflow-hidden">
        <Image
          src={imageURL || "@/public/images/liked.png"}
          className="object-cover"
          alt="Library Item"
          fill
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow:hidden">
        <p className="text-white truncate">
          {data.title}
        </p>
        <p className="text-sm text-neutral-400 truncate">
          {data.author}
        </p>
      </div>
    </div>
  );
}

export default LibraryItem;
