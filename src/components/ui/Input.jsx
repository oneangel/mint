import React from "react";

export const Input = (props) => {
  return (
    <input
      className="bg-white border border-gray- text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-14 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
    />
  );
};
