import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useQueryClient } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { getClient } from "../hooks/client.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import {
  Card,
  CardHeader,
  Image,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import { IoCall, IoPerson } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { updateAvatar } from "../services/client.service";
import { MdEmail } from "react-icons/md";
import { FaUser, FaCheckCircle, FaTachometerAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import { updateSchema } from "../schemas/schemas";
import { clientHooks } from "../hooks/hooks";
import { useEffect } from "react";

export const EditProfile = () => {
  const {
    register: update,
    handleSubmit: handleUpdate,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched", resolver: zodResolver(updateSchema) });

  const queryClient = useQueryClient();
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [editAble, setEditAble] = useState(true);
  const fileInputRef = useRef(null);

  const auth = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery("client", getClient);
  const [selectedClient, setSelectClient] = useState({});

  const [imagen, setImagen] = useState(null);

  const handleOpenImageSelector = () => {
    fileInputRef.current.click();
  };

  const updateClientMutation = useMutation(clientHooks.useUpdateClient, {
    onSuccess: () => {
      queryClient.refetchQueries("client");
      toast.dismiss();
      toast.success("Perfil actualizada con exito");
      setEditAble(true);
    },

    onError: (error) => {
      toast.dismiss();
      setEditAble(false);
      console.log("Aqui el status");
      console.log(error.message);
      toast.error("¡Hubo un error en la operacion!");
    },

    onMutate: () => {
      toast.loading("Actualizando perfil...");
      setEditAble(true);
    },
  });

  const onUpdate = (data) => {
    updateClientMutation.mutate(data);
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

  useEffect(() => {
    if (!isLoading && !isError) {
      setSelectClient(data.data);
    }
  }, [data, isLoading, isError]);

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-[#1A1A24]">
      <NavigationBar />
      <div className="mt-20 md:mt-32">
        <h1 className="hidden pl-20 mb-10 text-4xl font-semibold md:flex text-sky-700 dark:text-white">
          Perfil
        </h1>

        <div className="grid flex-wrap grid-cols-1 gap-10 mx-4 xl:grid-cols-3 md:mx-20">
          <div className="flex flex-col items-center pt-10 pb-10 bg-white border-2 shadow-sm lg:col-span-1 rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
            <Card
              isFooterBlurred
              className="w-[300px] h-[300px] col-span-12 sm:col-span-7 mb-5"
            >
              {!isLoading && (
                <CardHeader className="absolute z-10 flex-row items-center top-1">
                  <h4 className="text-xl font-medium text-white/90">
                    {data.data.username}
                  </h4>
                  {data.data.verify ? (
                    <RiVerifiedBadgeFill className="text-2xl text-white" />
                  ) : (
                    <></>
                  )}
                </CardHeader>
              )}
              {!isLoading && (
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 object-cover w-full h-full"
                  src={selectedImageUrl ? selectedImageUrl : data.data.avatar}
                />
              )}
              <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex items-center flex-grow gap-2">
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
                    <MdEmail className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                  }
                />
                <Input
                  type="text"
                  label="Nombre completo"
                  placeholder={`${data.data.firstname} ${data.data.lastname}`}
                  readOnly
                  className="w-[350px] mt-2"
                  startContent={
                    <FaUser className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                  }
                />
              </>
            )}
          </div>

          {!isLoading && (
            <div className="min-h-[400px] w-full lg:col-span-2 flex">
              <div className="w-full p-6 bg-white border-2 shadow-sm rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex justify-between">
                  <h1 className="pl-5 mb-10 text-2xl font-semibold md:flex text-sky-700 dark:text-white">
                    Detalles del perfil
                  </h1>
                  <div>
                    {!editAble && (
                      <>
                        <Button
                          isIconOnly
                          className="mr-2"
                          color="danger"
                          variant="faded"
                          aria-label="select_image"
                          size="md"
                          onClick={() => {
                            queryClient.refetchQueries("client");
                            setEditAble(!editAble);
                          }}
                        >
                          <MdCancel className="text-2xl" />
                        </Button>
                        <Button
                          isIconOnly
                          className="mr-2"
                          color="success"
                          variant="faded"
                          aria-label="select_image"
                          size="md"
                          isDisabled={!isValid}
                          onClick={handleUpdate(onUpdate)}
                        >
                          <FaCheckCircle className="text-2xl" />
                        </Button>
                      </>
                    )}
                    <Button
                      isIconOnly
                      className="mr-2"
                      color="warning"
                      variant="faded"
                      aria-label="select_image"
                      size="md"
                      onClick={() => setEditAble(!editAble)}
                    >
                      <FaUserEdit className="text-2xl" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled={editAble}
                      startContent={
                        <FaTachometerAlt className="mb-1 text-sky-700" />
                      }
                      label="Meter"
                      type="number"
                      {...update("meter", {
                        required: "El campo es obligatorio",
                      })}
                      isInvalid={!!errors.meter}
                      errorMessage={errors.meter?.message || ""}
                      value={selectedClient.meter || ""}
                      onChange={(e) =>
                        setSelectClient({
                          ...selectedClient,
                          meter: e.target.value,
                        })
                      }
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled={editAble}
                      startContent={<IoCall className="mb-1 text-sky-700" />}
                      label="Numero de telefono"
                      type="number"
                      {...update("phone", {
                        required: "El campo es obligatorio",
                      })}
                      isInvalid={!!errors.phone}
                      errorMessage={errors.phone?.message || ""}
                      value={selectedClient.phone || ""}
                      onChange={(e) =>
                        setSelectClient({
                          ...selectedClient,
                          phone: e.target.value,
                        })
                      }
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled={editAble}
                      startContent={<IoPerson className="mb-1 text-sky-700" />}
                      label="Nombre"
                      type="text"
                      {...update("firstname", {
                        required: "El campo es obligatorio",
                      })}
                      isInvalid={!!errors.firstname}
                      errorMessage={errors.firstname?.message || ""}
                      value={selectedClient.firstname || ""}
                      onChange={(e) =>
                        setSelectClient({
                          ...selectedClient,
                          firstname: e.target.value,
                        })
                      }
                      size="md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-[90%]">
                    <Input
                      isDisabled={editAble}
                      startContent={<IoPerson className="mb-1 text-sky-700" />}
                      label="Apellido"
                      type="text"
                      {...update("lastname", {
                        required: "El campo es obligatorio",
                      })}
                      isInvalid={!!errors.lastname}
                      errorMessage={errors.lastname?.message || ""}
                      value={selectedClient.lastname || ""}
                      onChange={(e) =>
                        setSelectClient({
                          ...selectedClient,
                          lastname: e.target.value,
                        })
                      }
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
