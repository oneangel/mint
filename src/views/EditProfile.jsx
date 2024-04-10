import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { getClient } from "../hooks/client.hooks";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";
import {
  IoCalendarClear,
  IoCall,
  IoLockClosed,
  IoPerson,
} from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { GoEye, GoEyeClosed } from "react-icons/go";

export const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const auth = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery("client", getClient);

  const [modals, setModals] = useState([
    {
      isOpen: false,
      content: { name: "", lastName: "", password: "", confirmPassword: "" },
    },
    { isOpen: false, content: "" },
    { isOpen: false, content: "" },
    { isOpen: false, content: "" },
  ]);

  const toggleModal = (index) => {
    const newModals = [...modals];
    newModals[index].isOpen = !newModals[index].isOpen;
    setModals(newModals);
  };

  const fields = [
    {
      label: "Nombre de la cuenta",
      defaultValue: "Lalo Fuentes", //Aqui pues el que traiga de la bd 🤑
      icon: IoPerson,
      placeholder: "Nombre",
      index: 0,
      type: "text",
    },
    {
      label: "Número de telefono",
      defaultValue: "618-335-0785", //Aqui pues el que traiga de la bd 🤑
      icon: IoCall,
      placeholder: "Nuevo número",
      index: 1,
      type: "text",
    },
    {
      label: "Fecha de nacimiento",
      defaultValue: "2004-09-29", //Aqui pues el que traiga de la bd 🤑
      icon: IoCalendarClear,
      placeholder: "",
      index: 2,
      type: "date",
    },
    {
      label: "Contraseña",
      defaultValue: "********", //Aqui pues el que traiga de la bd 🤑
      icon: IoLockClosed,
      placeholder: "Nueva Contraseña",
      index: 3,
      type: "password",
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />
      <div className="flex flex-col items-center w-full h-full">
        <div className="mt-40 w-[700px]">
          <div className="flex flex-wrap w-full p-2 bg-white border-2 shadow-sm rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-center w-1/4 p-4">
              <div className="overflow-hidden rounded-full size-36">
                {!isLoading && (
                  <img
                    src={`${data.data.avatar}`}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col w-3/4 pt-8 pl-10">
              <Button
                color="default"
                variant="ghost"
                className="w-56 font-semibold"
              >
                Subir nueva Imagen
              </Button>
              <p className="mt-5 text-sm text-default-700">
                Se recomienda agregar una imagen de 800x800 px o menos se
                recomienda en formato JPG o PNG.
              </p>
            </div>
          </div>

          <div className="p-6 mt-10 bg-white border-2 shadow-sm rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-wrap mb-5">
                <div className="w-[90%]">
                  <Input
                    isDisabled
                    startContent={<field.icon className="mb-1 text-sky-700" />}
                    label={field.label}
                    type="text"
                    defaultValue={field.defaultValue}
                    size="md"
                  />
                </div>
                <div className="flex items-center justify-end w-[10%]">
                  <Tooltip content="Editar">
                    <span
                      onClick={() => toggleModal(field.index)}
                      className="flex items-center justify-center rounded-md size-10 bg-primary"
                    >
                      <BsPencilSquare className="text-white size-6" />
                    </span>
                  </Tooltip>

                  <Modal
                    isOpen={modals[field.index].isOpen}
                    onClose={() => toggleModal(field.index)}
                  >
                    <ModalContent>
                      <ModalHeader className="flex flex-col gap-1">
                        {field.label}
                      </ModalHeader>
                      <ModalBody>
                        {field.index === 0 && (
                          <>
                            <Input
                              placeholder="Nombre"
                              size="sm"
                              type="text"
                              value={modals[field.index].content.name}
                              onChange={(e) => {
                                const newModals = [...modals];
                                newModals[field.index].content.name =
                                  e.target.value;
                                setModals(newModals);
                              }}
                            />
                            <Input
                              placeholder="Apellidos"
                              size="sm"
                              type="text"
                              value={modals[field.index].content.lastName}
                              onChange={(e) => {
                                const newModals = [...modals];
                                newModals[field.index].content.lastName =
                                  e.target.value;
                                setModals(newModals);
                              }}
                            />
                          </>
                        )}
                        {field.index === 3 && (
                          <>
                            <Input
                              placeholder="Contraseña"
                              size="sm"
                              type={showPassword ? "text" : "password"}
                              value={modals[field.index].content.password}
                              onChange={(e) => {
                                const newModals = [...modals];
                                newModals[field.index].content.password =
                                  e.target.value;
                                setModals(newModals);
                              }}
                              endContent={
                                <button className="my-auto focus:outline-none">
                                  {" "}
                                  {showPassword ? (
                                    <GoEyeClosed
                                      className="text-2xl text-default-400"
                                      onClick={() => setShowPassword(false)}
                                    />
                                  ) : (
                                    <GoEye
                                      className="text-2xl text-default-400"
                                      onClick={() => setShowPassword(true)}
                                    />
                                  )}
                                </button>
                              }
                            />
                            <Input
                              placeholder="Confirmar Contraseña"
                              size="sm"
                              type={showPasswordC ? "text" : "password"}
                              value={
                                modals[field.index].content.confirmPassword
                              }
                              onChange={(e) => {
                                const newModals = [...modals];
                                newModals[field.index].content.confirmPassword =
                                  e.target.value;
                                setModals(newModals);
                              }}
                              endContent={
                                <button className="my-auto focus:outline-none">
                                  {" "}
                                  {showPasswordC ? (
                                    <GoEyeClosed
                                      className="text-2xl text-default-400"
                                      onClick={() => setShowPasswordC(false)}
                                    />
                                  ) : (
                                    <GoEye
                                      className="text-2xl text-default-400"
                                      onClick={() => setShowPasswordC(true)}
                                    />
                                  )}
                                </button>
                              }
                            />
                          </>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onClick={() => toggleModal(field.index)}
                        >
                          Cerrar
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            console.log(
                              `Nuevo valor para ${field.label}: ${
                                modals[field.index].content
                              }`
                            );
                            toggleModal(field.index);
                          }}
                        >
                          Guardar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
