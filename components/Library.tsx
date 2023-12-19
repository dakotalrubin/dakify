// Required for client component to use React hooks
"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

// Library component
const Library = () => {
  // Open a music upload modal
  const onClick = () => {
    // Handle music uploading here!
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
        Song List
      </div>
    </div>
  );
}

export default Library;
