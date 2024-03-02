import React from "react";
import MintLogo from "../assets/img/icons/mint-logo.png";
export default function Header() {
  return (
    <>
      <div className={`h-[100px] text-center mx-96 mb-10`}><img src={MintLogo} alt="" className="w-24"/></div>
    </>
  );
}