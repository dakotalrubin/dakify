// Required for client component to use React hooks
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import useWait from "@/hooks/useWait";
import Input from "./Input";

// SearchInput component waits and fetches an updated list of songs based
// on the given search query
const SearchInput = () => {
  // Create a variable and setter for a value of type string
  const [value, setValue] = useState<string>("");

  // Create a default wait value of 500 ms with the custom useWait hook
  const waitValue = useWait<string>(value, 500);

  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Call useEffect any time the wait value or page route changes
  useEffect(() => {
    // Create a query with the given wait value
    const query = {
      title: waitValue
    };

    // Stringify an object into a query string called url
    const url = qs.stringifyUrl({
      url: "/search",
      query: query
    });

    // Navigate to the provided URL
    router.push(url);
  }, [waitValue, router]);

  // Render the Search page Input component
  return (
    <div>
      <Input
        onChange={(event) => setValue(event.target.value)}
        value={value}
        placeholder="Let's find you some music!"
      />
    </div>
  );
}

export default SearchInput;
