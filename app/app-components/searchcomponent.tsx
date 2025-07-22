"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RecordShape } from "neo4j-driver";
import { fetchNames } from "../neo4j/utils";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type SearchComponentProps = {};
const SearchComponent = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [personKey, setPersonKey] = React.useState<string>("");
  const [personName, setPersonName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [nameList, setNameList] = React.useState<RecordShape[] | undefined>([]);

  //debounce code
  React.useEffect(() => {
    const setData = setTimeout(async () => {
      await onNameSearch(personName);
    }, 1000);
    return () => clearTimeout(setData);
  }, [personName]);

  const onNameSearch = async (val: string) => {
    try {
      setIsLoading(true);
      if (val !== "" && val.length > 2) {
        console.log("val:", val);
        const result = await fetchNames(val);
        // console.log("names list: ", result, typeof result);
        setNameList(result);
      }
    } catch (error) {
      console.error("fetching names error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {personKey
            ? (() => {
                const res = nameList?.find(
                  (personObject) => personObject.id === personKey
                );
                return res ? `${res?.name} ${res?.lname}` : "Person";
              })()
            : "Person"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search People..." className="h-9" /> */}
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Type Name here..."
              value={personName}
              onChange={(e) => setPersonName(e.currentTarget.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400"
            />
          </div>
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading..." : "No Person found."}
            </CommandEmpty>
            <CommandGroup>
              {nameList?.map((personObject) => (
                <CommandItem
                  key={personObject.id}
                  value={personObject.id}
                  onSelect={(currentValue) => {
                    setPersonKey(
                      currentValue === personKey ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "ml-auto",
                      personKey === personObject.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {personObject.name + " " + personObject.lname}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SearchComponent;
