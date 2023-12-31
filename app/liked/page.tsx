import Image from "next/image";

import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import LikedItems from "./components/LikedItems";

// Data on the web page will always be up-to-date. The page won't be cached.
export const revalidate = 0;

// Render the page containing the user's list of liked songs
const Liked = async () => {
  // Retrieve the user's list of liked songs
  const songs = await getLikedSongs();

  return (
    <div className="h-full w-full rounded-lg overflow-hidden overflow-y-auto 
      bg-neutral-900">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                className="object-cover"
                src="/images/liked.png"
                fill
                alt="Playlist"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="font-semibold hidden md:block">
                Playlist
              </p>
              <h1 className="font-bold text-4xl lg:text-7xl sm:text-5xl 
              text-white">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedItems songs={songs} />
    </div>
  );
}

export default Liked;
