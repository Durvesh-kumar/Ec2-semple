import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextPropes {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  placeHolder: string;
}

const MultiText: React.FC<MultiTextPropes> = ({
  value,
  onChange,
  onRemove,
  placeHolder,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeHolder}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();

            if (inputValue.length > 1) {
              addValue(inputValue);
            }
          }
        }}
      />
      <div className="flex flex-wrap gap-1">
        {value?.map((item, index) => (
          <Badge
            key={index}
            className="text-white bg-orange-700 rounded-xl flex flex-nowrap items-center gap-2 text-lg font-normal px-3 py-1"
          >
            {item}
            <button
              onClick={() => onRemove(item)}
              type="button"
              className="text-white hover:bg-gray-950 rounded-full"
            >
              <X className="w-4 h-4 m-1" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
