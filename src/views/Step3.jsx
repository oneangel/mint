import { React, useState } from "react";
import { ButtonA, Input, Label } from "../components/ui/ui-components";
import { Link, useNavigate } from "react-router-dom";

export const Step3 = ({ control, previousStep }) => {
  return (
    <>
      <div className="mb-12">
        <Label htmlFor="text">Nombre legal</Label>
        <div className="relative text-3xl font-light">
          <input name="name" {...control("firstname")} />
        </div>
      </div>
      <div className="mb-12">
        <Label htmlFor="text">Apellidos legales</Label>
        <div className="relative text-3xl font-light">
          <input name="lastname" {...control("lastname")} />
        </div>
      </div>

      <div className="text-center pt-20">
        <button
          className="text-sky-700 border border-sky-700 bg-white hover:bg-cyan-100 font-medium rounded-2xl text-4xl px-48 py-3 w-full mb-6"
          onClick={previousStep}
        >
          Anterior
        </button>
      </div>
    </>
  );
};
