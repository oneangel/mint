import { Skeleton, Tooltip } from "@nextui-org/react";
import React from "react";

export const CurrentBalance = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Tooltip content="Presiona para ver mas detalle" color="primary">
      <Skeleton
      isLoaded={isLoaded}
      className="rounded-3xl shadow-md"
    >
      <div className="h-[250px] w-[480px] bg-white rounded-3xl border-1 border-gray-200">
        <p className="pt-4 pl-4 text-xl font-semibold">Saldo Actual</p>

        <div className="flex flex-col h-full justify-center">
          <h1 className="text-center font-semibold text-6xl text-teal-600 mb-2">
            $25,000
          </h1>
          <p className="text-center pb-10 text-lg text-zinc-500">
            Martes 11, 2024 •<span> 6:25 PM</span>
          </p>
        </div>
      </div>
    </Skeleton>
    </Tooltip>
    
  );
};
