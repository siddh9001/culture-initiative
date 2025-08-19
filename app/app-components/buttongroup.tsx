"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type ButtonGroupProps = {
  enableUpdateButton: boolean;
  enableDeleteButton: boolean;
  enableNewButton: boolean;
  onNewClick?: () => void; // add prop
  onUpdateClick?: () => void; // add prop
  onDeleteClick?: () => void; // add prop
};

export default function ButtonGroup({
  enableUpdateButton,
  enableDeleteButton,
  enableNewButton,
  onNewClick, // receive prop
}: ButtonGroupProps) {
  return (
    <div className="flex justify-evenly items-center gap-2 ml-auto">
      <Button
        className="cusror-pointer"
        onClick={onNewClick ? onNewClick : () => console.log("new button")}
        disabled={!enableNewButton}
      >
        + New
      </Button>
      <Button
        className="cusror-pointer"
        onClick={() => console.log("update button")}
        disabled={!enableUpdateButton}
      >
        Update
      </Button>
      <Button
        className="cusror-pointer"
        onClick={() => console.log("del button")}
        disabled={!enableDeleteButton}
      >
        Delete
      </Button>
      {/* <Button
        className={`cusror-pointer ${
          !enableNewButton && "pointer-events-none opacity-70"
        }`}
        onClick={() => console.log("new button")}
      >
        + New
      </Button>
      <Button
        className={`cusror-pointer ${
          !enableUpdateButton && "pointer-events-none opacity-70"
        }`}
        onClick={() => console.log("update button")}
      >
        Update
      </Button>
      <Button
        className={`cusror-pointer ${
          !enableDeleteButton && "pointer-events-none opacity-70"
        }`}
        onClick={() => console.log("del button")}
      >
        Delete
      </Button> */}
    </div>
  );
}
