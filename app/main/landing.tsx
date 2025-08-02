"use client";
import React, { useState } from "react";
import { Search, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchPage from "./search/page";
import DataPortal from "./dataportal/page";

type MainProps = {
  children?: React.ReactNode;
};

const LandingPage = () => {
  const [isDataPortal, setIsDataPortal] = useState<boolean>(false);
  return (
    <>
      <div className="min-h-screen bg-amber-500 flex">
        <div className="w-16 bg-amber-800 min-h-screen flex flex-col gap-3 items-center p-4">
          <Button
            variant="secondary"
            size="lg"
            className="size-12 hover:cursor-pointer"
            onClick={() => setIsDataPortal(false)}
          >
            <Search />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="size-12 hover:cursor-pointer"
            onClick={() => setIsDataPortal(true)}
          >
            <UserCog />
          </Button>
        </div>
        <div className="bg-gray-900 grow">
          <SearchPage />
          <DataPortal />
          {/* {isDataPortal && children} */}
        </div>
      </div>
    </>
  );
};
export default LandingPage;
