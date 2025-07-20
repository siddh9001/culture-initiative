import React from "react";
import IconButton from "../app-components/iconbutton";
import SearchPage from "./search/page";

type Props = {};

const Main = (props: Props) => {
  return (
    <>
      <div className="min-h-screen bg-amber-500 flex">
        <div className="w-16 bg-amber-800 min-h-screen flex flex-col gap-3 items-center p-4">
          <IconButton iconName="search" />
          <IconButton iconName="user-cog" />
        </div>
        <div className="bg-green-400 grow">
          <SearchPage />
        </div>
      </div>
    </>
  );
};
export default Main;
