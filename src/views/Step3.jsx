import { React, useState } from "react";
import { Label } from "../components/ui/ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { IoMailSharp } from "react-icons/io5";

export const Step3 = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-12">
        <p className="mb-8 text-center text-xl font-semibold">Asegúrese de que coincida con su identificación oficial.</p>
        <Input
          isRequired
          type="text"
          name="name"
          label="Nombre legal"
          variant="bordered"
          {...control("firstname")}
          size="lg"
          classNames={{ label: "text-2xl" }}
          className="rounded-2xl bg-white"
        />
      </div>

      <div className="mb-12">
        <Input
          isRequired
          type="text"
          name="lastname"
          label="Apellidos legales"
          variant="bordered"
          {...control("lastname")}
          size="lg"
          classNames={{ label: "text-2xl" }}
          className="rounded-2xl bg-white"
        />

      </div>

      <div className="text-center pt-20">
        <Button size="lg" className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-full shadow-lg mb-6">
          Anterior
        </Button>
      </div>
    </>
  );
};
