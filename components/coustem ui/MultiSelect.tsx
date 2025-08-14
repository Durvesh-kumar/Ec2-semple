'use client'
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { log } from 'console';

interface MultiSelectPropes {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  placeHolder: string;
  collections: CollectionType[]
}
const MultiSelect: React.FC<MultiSelectPropes> = ({
  value,
  onChange,
  onRemove,
  placeHolder,
  collections,
}) => {
  const [inputValue, setInputValue] = useState("");
  
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];


  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );
   const handleKeyPress = (e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
    }
   }
 
  return (
    <Command className=" overflow-visible bg-white">
      <div className="flex flex-wrap gap-2 border rounded-md">
        {selected?.map((collection) => (
          <Badge
            key={collection._id}
            className="text-white bg-orange-700 rounded-xl flex flex-nowrap items-center gap-2 text-lg font-normal px-3 py-1"
          >
            {collection.title}
            <button
              onClick={() => onRemove(collection._id)}
              type="button"
              className="text-white hover:bg-gray-950 rounded-full"
            >
              <X className="w-4 h-4 m-1" />
            </button>
          </Badge>
        ))}
        <CommandInput
          placeholder={placeHolder}
          value={inputValue}
          onKeyDown={handleKeyPress}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className=" relative mt-2">
        {open && (
          <CommandList className=" absolute w-full top-0 overflow-auto border rounded shadow-lg z-30">
            <CommandEmpty className="h-8 text-lg px-6">No results found.</CommandEmpty>
          <CommandGroup>
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                className="hover:bg-gray-400 cursor-pointer"
              >
                {collection?.title}
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;