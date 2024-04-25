import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useQueryClient } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { getClient, useUpdateAvatar } from "../hooks/client.hooks";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { IoMail, IoSpeedometer, IoLockClosed, IoPerson } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useUpdateClient } from "../hooks/client.hooks";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";

export const EditProfile = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "onTouched" });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [disabledPass, setDisabledPass] = useState(true);
  const [disabledMeter, setDisabledMeter] = useState(true);
  const fileInputRef = useRef(null);
  const auth = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery("client", getClient);

  useEffect(() => {
    if (data && data.data) {
      setValue("username", data.data.username);
      setValue("password", data.data.password);
      setValue("email", data.data.email);
      setValue("meter", data.data.meter);
      setValue("avatar", data.data.avatar);
    }
  }, [data, setValue]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
      setSelectedImageUrl(URL.createObjectURL(file));
      setValue("avatar", file); // Crear URL de la imagen seleccionada
    } else {
      setSelectedFile(null, file);
      setSelectedImageUrl(null); // Restablecer la URL de la imagen seleccionada
      alert("Por favor, seleccione un archivo .jpg o .png");
    }
  };

  const updateClientMutation = useMutation(useUpdateClient, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Perfil actualizado con exito");
    },

    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
    },

    onMutate: () => {
      toast.loading("Actualizando perfil...");
    },
  });

  const updateAvatar = useMutation(useUpdateAvatar, {
    onSuccess: () => {
      queryClient.refetchQueries("client");
      toast.dismiss();
    },

    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
    },
  });

  const onUpdate = (data) => {
    try {
      updateClientMutation.mutateAsync(data).then(() => {
        updateAvatar.mutate(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const labels = [
    {
      label: "Nombre de usuario",
      icon: <IoPerson className="mb-1 text-sky-700" />,
      disabled: disabledUsername,
      name: "username",
    },

    {
      label: "Contraseña",
      icon: <IoLockClosed className="mb-1 text-sky-700" />,
      disabled: disabledPass,
      name: "password",
    },

    {
      label: "Email",
      icon: <IoMail className="mb-1 text-sky-700" />,
      disabled: true,
      name: "email",
    },

    {
      label: "Medidor",
      icon: <IoSpeedometer className="mb-1 text-sky-700" />,
      disabled: disabledMeter,
      name: "meter",
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-[#1A1A24]">
      <NavigationBar />
      <div className="flex flex-col items-center w-full h-full">
        <div className="mt-40 max-w-[700px]">
          <div className="flex flex-wrap w-full p-2 bg-white border-2 shadow-sm rounded-3xl dark:bg-[#2C2F42] dark:border-zinc-800">
            <div className="flex items-center justify-center w-1/4 p-4">
              <div className="overflow-hidden rounded-full size-24 md:size-36">
                {selectedImageUrl ? ( // Si hay una imagen seleccionada, mostrarla
                  <img
                    src={selectedImageUrl}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  !isLoading && ( // Si no hay imagen seleccionada, mostrar la imagen predeterminada
                    <img
                      src={data.data.avatar}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col w-3/4 pt-8 pl-10 dark:bg-[#2C2F42] dark:border-zinc-800">
              <Input
                id="file-upload"
                type="file"
                accept=".jpg .png"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                color="default"
                variant="ghost"
                className="w-40 font-semibold md:w-56"
                onClick={handleButtonClick}
              >
                Subir nueva Imagen
              </Button>
              <p className="mt-5 text-sm text-default-700">
                Se recomienda agregar una imagen de 800x800 px o menos se
                recomienda en formato JPG o PNG.
              </p>
            </div>
          </div>

          <div className="p-6 mt-10 bg-white border-2 shadow-sm rounded-3xl dark:bg-[#2C2F42] dark:border-zinc-800">
            <form onSubmit={handleSubmit(onUpdate)}>
              {labels.map((label, index) => (
                <div className="flex flex-wrap mb-5" key={index}>
                  <div className="w-[90%]">
                    {!isLoading && (
                      <Input
                        isDisabled={label.disabled}
                        startContent={label.icon}
                        name={label.name}
                        label={label.label}
                        type="text"
                        defaultValue={
                          label.label === "Nombre de usuario"
                            ? data.data.username
                            : label.label === "Email"
                            ? data.data.email
                            : label.label == "Contraseña"
                            ? data.data.password
                            : data.data.meter
                        }
                        {...register(label.name)}
                        size="md"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-end w-[10%]">
                    {label.label != "Email" && (
                      <div
                        onClick={() => {
                          label.label === "Nombre de usuario"
                            ? setDisabledUsername(!disabledUsername)
                            : label.label == "Contraseña"
                            ? setDisabledPass(!disabledPass)
                            : setDisabledMeter(!disabledMeter);
                        }}
                      >
                        <Tooltip content="Editar">
                          <span className="flex items-center justify-center rounded-md size-10 bg-primary">
                            <BsPencilSquare className="text-white size-6" />
                          </span>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
        <Button
          color="default"
          variant="ghost"
          className="w-40 mt-4 font-semibold md:w-56 dark:bg-[#2C2F42] dark:border-zinc-800"
          onClick={handleSubmit(onUpdate)}
        >
          Actualizar
        </Button>
      </div>
      <Toaster />
    </div>
  );
};
