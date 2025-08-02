"use client";
import { fetchData, fetchRecentlyAddedNodes } from "@/lib/neo4j/utils";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchComponent from "@/app/app-components/searchcomponent";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  // return [
  //   {
  //     id: "728ed52f",
  //     amount: 100,
  //     status: "pending",
  //     email: "m@example.com",
  //   },
  //   {
  //     id: "bd92fa16",
  //     amount: 250,
  //     status: "success",
  //     email: "alice@example.com",
  //   },
  //   {
  //     id: "41f8e312",
  //     amount: 75,
  //     status: "failed",
  //     email: "bob@example.com",
  //   },
  //   {
  //     id: "f3271bc9",
  //     amount: 180,
  //     status: "pending",
  //     email: "carol@example.com",
  //   },
  //   {
  //     id: "ea76342b",
  //     amount: 320,
  //     status: "processing",
  //     email: "dave@example.com",
  //   },
  //   {
  //     id: "538d9fa0",
  //     amount: 60,
  //     status: "success",
  //     email: "eve@example.com",
  //   },
  // ];
  const neo4jdata = await fetchRecentlyAddedNodes();
  // console.log("neo4jdata:", neo4jdata);
  return neo4jdata;
}

export default function DataPortal() {
  // let data = await getData();
  // const [filterName, setFilterName] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Payment[]>([]);
  const [personKey, setPersonKey] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      let dat = await getData();
      setData(dat);
    };
    fetchData();
  }, []);

  const onfilterNameSearch = async () => {
    try {
      setIsLoading(true);
      if (personKey !== "") {
        const data = await fetchData(personKey);
        // console.log("filterdata: ", data);
        setData(data);
        setPersonKey("");
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
    <div className="container mx-auto py-10">
      <div className="flex items-center py-4 gap-2">
        <SearchComponent personKey={personKey} setPersonKey={setPersonKey} />
        <Button
          className={`px-2 w-40 ${
            isLoading && "opacity-[0.7] disabled:pointer-events-none"
          }`}
          // className="px-2 bg-gray-400 text-black"
          onClick={onfilterNameSearch}
        >
          {isLoading ? "Searching..." : "Search"}
          {/* Search */}
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
