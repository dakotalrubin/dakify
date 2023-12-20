import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  // Render titles, playlists and songs
  return (
    <div className="rounded-lg h-full w-full overflow-hidden 
      overflow-y-auto bg-neutral-900">
      <Header>
        <div className="mb-2">
          <h1 className="font-semibold text-3xl text-white">
            Welcome back!
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 
            2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/liked.png" name="Liked Songs" 
              href="liked" />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl text-white">
            New Songs
          </h1>
        </div>
        <div>
          Song List
        </div>
      </div>
    </div>
  )
}
