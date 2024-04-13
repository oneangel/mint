import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export const Step3 = ({ control, previousStep }) => {
  const [name, setName] = useState("");
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameIsTouched, setLastNameIsTouched] = useState(false);

  const isNameInvalid = React.useMemo(() => {
    if (name === "" || !nameIsTouched) return false;
    return false;
  }, [name, nameIsTouched]);

  const isLastNameInvalid = React.useMemo(() => {
    if (lastName === "" || !lastNameIsTouched) return false;
    return false;
  }, [lastName, lastNameIsTouched]);

  const isFormValid = React.useMemo(() => {
    const isAnyFieldTouched = nameIsTouched || lastNameIsTouched;
    return (
      isAnyFieldTouched &&
      (!nameIsTouched || !isNameInvalid) &&
      (!lastNameIsTouched || !isLastNameInvalid)
    );
  }, [nameIsTouched, lastNameIsTouched, isNameInvalid, isLastNameInvalid]);

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
            onValueChange={(value) => {
              setName(value);
              setNameIsTouched(true);
            }}
            isInvalid={nameIsTouched && isNameInvalid}
            errorMessage={
              nameIsTouched && isNameInvalid && "El nombre no es válido."
            }
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
            onValueChange={(value) => {
              setLastName(value);
              setLastNameIsTouched(true);
            }}
            isInvalid={lastNameIsTouched && isLastNameInvalid}
            errorMessage={
              lastNameIsTouched &&
              isLastNameInvalid &&
              "Los apellidos no son válidos."
            }
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
