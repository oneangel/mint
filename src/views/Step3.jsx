import { React, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const Step3 = ({ control, previousStep }) => {
  return (
    <>
      <div className="mb-12">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type="text"
            name="name"
            label="Nombre o Nombres Legales"
            {...control("firstname")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="rounded-2xl bg-white"
          />
        </div>
      </div>
      <div className="mb-12">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type="text"
            name="lastname"
            label="Apellidos Legales"
            {...control("lastname")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="rounded-2xl bg-white"
          />
        </div>
        <p className="text-xl font-light mt-3">
          Asegurese de que su nombre y sus apellidos coincidan con los de su identificación oficial.
        </p>
      </div>

      <div className="text-center pt-20">
        <Button
          className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-full shadow-lg mb-5"
          onClick={previousStep}
        >
          Anterior
        </Button>
      </div>
    </>
  );
};
