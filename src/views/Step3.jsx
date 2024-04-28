import React from "react";
import { Button, Input } from "@nextui-org/react";

export const Step3 = ({ control, previousStep, errors }) => {
  return (
    <>
      <div className="mb-12">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type="text"
            name="name"
            label="Nombre o Nombres Legales"
            {...control("firstname", { required: "el campo es obligatorio" })}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="bg-white rounded-2xl"
            isInvalid={!!errors.firstname}
            errorMessage={errors?.firstname?.message}
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
            {...control("lastname", { required: "el campo es obligatorio" })}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="bg-white rounded-2xl"
            isInvalid={!!errors.lastname}
            errorMessage={errors?.lastname?.message}
          />
        </div>
        <p className="mt-3 text-xl font-light">
          Asegúrese de que su nombre y sus apellidos coincidan con los de su
          identificación oficial.
        </p>
      </div>
      <div className="pt-20 text-center">
        <Button
          className="w-full py-8 mb-5 text-4xl font-medium bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl"
          onClick={previousStep}
        >
          Anterior
        </Button>
      </div>
    </>
  );
};
