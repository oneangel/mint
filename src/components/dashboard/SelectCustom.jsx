import { Select, SelectItem } from "@nextui-org/react";
import { IoCalendarOutline } from "react-icons/io5";
import { animals } from "../../views/data";

export const SelectCustom = ({ handleFilterByDate }) => {
  return (
    <Select
      variant="bordered"
      startContent={<IoCalendarOutline className="text-sky-700" />}
      defaultSelectedKeys={["esta-semana"]}
      className="max-w-xs text-2xl bg-white text-sky-600 dark:bg-[#2C2F42]"
      classNames={{
        value: [
          "placeholder:text-default-700/50 dark:placeholder:text-white text-xl",
        ],
      }}
    >
      {animals.map((animal) => (
        <SelectItem
          key={animal.value}
          value={animal.value}
          onClick={() => handleFilterByDate(animal.startDate, animal.endDate)}
        >
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
};
