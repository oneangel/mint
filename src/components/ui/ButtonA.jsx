import React from "react";

export const ButtonA = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="text-white bg-gradient-to-r from-cyan-700 to-cyan-500 hover:to-cyan-700 font-medium rounded-2xl text-4xl px-5 py-4 w-full"
    >
      {children}
    </button>
  );
};
