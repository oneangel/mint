import React from "react";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

export const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <Input
      variant="bordered"
      radius="lg"
      value={searchTerm}
      onChange={handleSearchChange}
      className="bg-white rounded-3xl"
      classNames={{
        input: [
          "text-black/90 dark:text-white/90 text-xl",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-white dark:bg-zinc-900",
        inputWrapper: [
          "dark:bg-zinc-900",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "dark:hover:border-zinc-500",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
          "text-2xl",
        ],
      }}
      placeholder="Escribe para buscar la descripción..."
      startContent={<IoSearch className="text-sky-700" />}
    />
  );
};
