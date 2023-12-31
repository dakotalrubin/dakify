import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchItems from "./components/SearchItems";

// Data on the web page will always be up-to-date. The page won't be cached.
export const revalidate = 0;

// SearchProps interface contains a title string
interface SearchProps {
  searchParams: {
    title: string;
  }
}

// Search method accepts searchParams from the SearchProps interface
const Search = async ({ searchParams }: SearchProps) => {
  // Asynchronously fetch song list with given title from searchParams
  const songs = await getSongsByTitle(searchParams.title);

  // Render the SearchInput component and the fetched song list
  // on the Search page
  return (
    <div className="h-full w-full rounded-lg overflow-hidden overflow-y-auto 
      bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="font-semibold text-3xl text-white">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchItems songs={songs} />
    </div>
  );
}

export default Search;
