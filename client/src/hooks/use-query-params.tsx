import { useEffect, useState } from "react";

type SearchParams = Record<string, string>;

const useSearchParams = (): [SearchParams, (newParams: Partial<SearchParams>) => void] => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  useEffect(() => {
    const parseSearchParams = () => {
      const params = new URLSearchParams(window.location.search);
      const parsedParams: SearchParams = {};
      params.forEach((value, key) => {
        parsedParams[key] = value;
      });
      setSearchParams(parsedParams);
    };

    parseSearchParams(); // Parse initial URL

    const handlePopState = () => {
      parseSearchParams(); // Update on back/forward navigation
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, "", newUrl);
    setSearchParams(Object.fromEntries(params.entries()) as SearchParams);
  };

  return [searchParams, updateSearchParams];
};

export default useSearchParams;