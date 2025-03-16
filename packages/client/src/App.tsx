import React from "react";
import { useState, useEffect } from "react";
import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Item } from "api";

const fetchSearchResults = async (query: string): Promise<Item[]> => {
  const res = await fetch(`/api/search?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const App: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [moduleLoading, setModuleLoading] = useState(true);
  console.log(setModuleLoading);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading, isFetching, isError } = useQuery(
    ["search", debouncedQuery],
    () => fetchSearchResults(debouncedQuery),
    {
      enabled: Boolean(debouncedQuery), // Only fetch when there's a query
      keepPreviousData: true,
      staleTime: 5000, // Optional: reduce flickering by keeping data fresh for 5 seconds
    },
  );

  // useEffect(() => {
  //   // Lazy-load the About module dynamically (no React component involved)
  //   import("Sandbox/src/index")
  //     .then((module) => {
  //       module.greet("ok");
  //     })
  //     .finally(() => {
  //       setModuleLoading(false);
  //     });
  // }, []);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ..."
      />
      {moduleLoading && <p>Module is loadling...</p>}
      {debouncedQuery && isLoading && <p>Loading...</p>}
      {debouncedQuery && isFetching && <p>Fetching...</p>}
      {isError && <p>Something went wrong. Please try again.</p>}
      {data && data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        debouncedQuery && !isFetching && <p>No results found.</p>
      )}
    </div>
  );
};

export default App;
