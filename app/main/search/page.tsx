"use client";
import React, { useState } from "react";
import SearchComponent from "@/app/app-components/searchcomponent";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/neo4j/utils";

type SearchPageProps = {};
const SearchPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fromPersonKey, setFromPersonKey] = useState<string>("");
  const [toPersonKey, setToPersonKey] = useState<string>("");

  const onClickSearch = async () => {
    try {
      setIsLoading(true);
      if (fromPersonKey !== "" && toPersonKey !== "") {
        const data = await fetchData(fromPersonKey, toPersonKey);
        // console.log(data);
        setFromPersonKey("");
        setToPersonKey("");
      } else {
        throw new Error("Both Person required !");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <SearchComponent
        personKey={fromPersonKey}
        setPersonKey={setFromPersonKey}
      />
      <SearchComponent personKey={toPersonKey} setPersonKey={setToPersonKey} />
      <Button className="w-40" onClick={onClickSearch}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};
export default SearchPage;
