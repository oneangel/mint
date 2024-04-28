import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { getClient } from "../hooks/client.hooks";
import {
  Card,
  CardHeader,
  Image,
  CardFooter,
  Divider,
} from "@nextui-org/react";
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
  IoMail,
} from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { updateAvatar } from "../services/client.service";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const auth = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery("client", getClient);

  const [imagen, setImagen] = useState(null);

  const handleOpenImageSelector = () => {
    fileInputRef.current.click();
  };

  const handleSeleccionarImagen = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImagen(file);
      setSelectedImageUrl(URL.createObjectURL(file));
    } else {
      setImagen(null);
      setSelectedImageUrl(null);
      toast.error("Seleccione una imagen con formato png o jpeg");
    }
  };

  const handleSubmit = () => {
    console.log("pepe");
    if (imagen) {
      console.log("Hola");
      const codeUsuario = "Begec";
      updateAvatar(codeUsuario, imagen);
    } else {
      console.log("Primero selecciona una imagen.");
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-[#1A1A24]">
      <NavigationBar />
      <div className="mt-20 md:mt-32">
        <h1 className="hidden pl-20 text-4xl font-semibold md:flex text-sky-700 dark:text-white mb-10">
          Perfil
        </h1>

        <div className="grid flex-wrap grid-cols-1 gap-10 mx-4 xl:grid-cols-3 md:mx-20">
          <div className="flex flex-col items-center pt-10 pb-10 lg:col-span-1 bg-white border-2 shadow-sm rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
            <Card
              isFooterBlurred
              className="w-[300px] h-[300px] col-span-12 sm:col-span-7 mb-5"
            >
              {!isLoading && (
                <CardHeader className="absolute z-10 top-1 flex-row items-start items-center">
                  <h4 className="text-white/90 font-medium text-xl">
                    {data.data.username}
                  </h4>
                  {data.data.verify ? (
                    <RiVerifiedBadgeFill className="text-white text-2xl" />
                  ) : (
                    <></>
                  )}
                </CardHeader>
              )}
              {!isLoading && (
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src={selectedImageUrl ? selectedImageUrl : data.data.avatar}
                />
              )}
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">
                      Seleccionar una imagen en formato JPG y PNG para evitar
                      errores.
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  onChange={handleSeleccionarImagen}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  isIconOnly
                  className="mr-2"
                  color="success"
                  variant="faded"
                  aria-label="select_image"
                  size="md"
                  onClick={() => handleOpenImageSelector()}
                >
                  <FaCamera />
                </Button>
                <Button
                  isIconOnly
                  color="success"
                  variant="faded"
                  aria-label=""
                  size="md"
                  isDisabled={imagen ? false : true}
                  onClick={() => handleSubmit()}
                >
                  <IoIosSend />
                </Button>
              </CardFooter>
            </Card>

            <Divider className="w-80" />
            {!isLoading && (
              <>
                <Input
                  type="email"
                  label="Email"
                  placeholder={data.data.email}
                  readOnly
                  className="w-[350px] mt-2"
                  startContent={
                    <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input
                  type="text"
                  label="Nombre completo"
                  placeholder={`${data.data.firstname} ${data.data.lastname}`}
                  readOnly
                  className="w-[350px] mt-2"
                  startContent={
                    <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </>
            )}
          </div>

          {!isLoading && (
            <div className="min-h-[400px] w-full lg:col-span-2 flex">
              <div className="p-6 bg-white w-full border-2 shadow-sm rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex justify-between">
                  <h1 className="pl-5 text-2xl font-semibold md:flex text-sky-700 dark:text-white mb-10">
                    Detalles del perfil
                  </h1>
                  <Button
                    isIconOnly
                    className="mr-2"
                    color="success"
                    variant="faded"
                    aria-label="select_image"
                    size="md"
                  >
                    <FaUserEdit className="text-2xl" />
                  </Button>
                </div>

                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled
                      startContent={<IoPerson className="mb-1 text-sky-700" />}
                      label="Nombre de usuario"
                      type="text"
                      defaultValue={data.data.username}
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled
                      startContent={<IoMail className="mb-1 text-sky-700" />}
                      label="Email"
                      type="email"
                      defaultValue={data.data.email}
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled
                      startContent={<IoCall className="mb-1 text-sky-700" />}
                      label="Numero de telefono"
                      type="number"
                      defaultValue={data.data.phone}
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled
                      startContent={<IoPerson className="mb-1 text-sky-700" />}
                      label="Nombre"
                      type="text"
                      defaultValue={data.data.firstname}
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled
                      startContent={<IoPerson className="mb-1 text-sky-700" />}
                      label="Apellido"
                      type="text"
                      defaultValue={data.data.lastname}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

{
  /* <div key={index} className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled
                      startContent={
                        <field.icon className="mb-1 text-sky-700" />
                      }
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
                                  newModals[
                                    field.index
                                  ].content.confirmPassword = e.target.value;
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
                </div> */
}
