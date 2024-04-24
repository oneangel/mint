import React, { useContext, useRef, useState } from "react";
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
import { IoMail, IoSpeedometer, IoLockClosed, IoPerson } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { GoEye, GoEyeClosed } from "react-icons/go";

export const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const fileInputRef = useRef(null);
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

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
      setSelectedImageUrl(URL.createObjectURL(file)); // Crear URL de la imagen seleccionada
    } else {
      setSelectedFile(null);
      setSelectedImageUrl(null); // Restablecer la URL de la imagen seleccionada
      alert("Por favor, seleccione un archivo .jpg o .png");
    }
  };

  const labels = [
    {
      label: "Nombre de usuario",
      icon: <IoPerson className="mb-1 text-sky-700" />,
    },

    {
      label: "Contraseña",
      icon: <IoLockClosed className="mb-1 text-sky-700" />,
    },

    {
      label: "Email",
      icon: <IoMail className="mb-1 text-sky-700" />,
    },

    {
      label: "Medidor",
      icon: <IoSpeedometer className="mb-1 text-sky-700" />,
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
                      src={`${data.data.avatar}`}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col w-3/4 pt-8 pl-10">
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

          <div className="p-6 mt-10 bg-white border-2 shadow-sm rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-wrap mb-5">
                <div className="w-[90%]">
                  {!isLoading && (
                    <Input
                      isDisabled
                      startContent={label.icon}
                      label={label.label}
                      type="text"
                      defaultValue={
                        label.label === "Nombre de usuario"
                          ? data.data.username
                          : label.label === "Email"
                          ? data.data.email
                          : label.label == "Contraseña"
                          ? data.data.phone
                          : data.data.meter
                      }
                      size="md"
                    />
                  )}
                </div>
                <div className="flex items-center justify-end w-[10%]">
                  {label.label != "Email" && (
                    <Tooltip content="Editar">
                      <span className="flex items-center justify-center rounded-md size-10 bg-primary">
                        <BsPencilSquare className="text-white size-6" />
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
