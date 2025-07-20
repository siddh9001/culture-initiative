import React from "react";
import { Search, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";

type IconButtonProps = {
  iconName?: string;
};

const IconButton = (props: IconButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="lg"
      className="size-12 hover:cursor-pointer"
    >
      {props.iconName === "search" && <Search />}
      {props.iconName === "user-cog" && <UserCog />}
    </Button>
  );
};

export default IconButton;
