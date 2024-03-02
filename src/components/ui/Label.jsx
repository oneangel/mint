import React from "react";

export const Label = ({children, ...props}) => {
  return (
    <label
      {...props}
      className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
    >
      {children}
    </label>
  );
};
