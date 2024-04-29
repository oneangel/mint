import { Skeleton, Card, CardHeader, CardBody } from "@nextui-org/react";
import { IoCaretDownCircle, IoCaretUpCircle } from "react-icons/io5";

export const TotalCard = ({ total, title, type }) => {
  return (
    <Card className="flex flex-col items-center bg-white shadow w-80 h-30 md:w-100 rounded-3xl border-1 dark:bg-[#2C2F42] dark:border-zinc-800">
      <CardHeader className="flex gap-4">
        {type === "income" ? (
          <IoCaretUpCircle className="text-teal-600 dark:text-teal-500 size-10" />
        ) : (
          <IoCaretDownCircle className="text-red-500 size-10 dark:text-red-400" />
        )}

        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">24 de marzo</p>
        </div>
      </CardHeader>
      <CardBody>
        <p className="mb-4 text-4xl font-semibold">${total.toFixed(2)}</p>
      </CardBody>
    </Card>
  );
};
