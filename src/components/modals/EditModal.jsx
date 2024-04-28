import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { GiSwapBag } from "react-icons/gi";
import { PiPencilCircle } from "react-icons/pi";

export const EditModal = ({
  isOpen,
  onClose,
  title,
  data,
  control,
  onSubmit,
  isValid,
  selectedItem,
  errors,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col items-center justify-center text-center">
          <PiPencilCircle className="text-teal-600 size-40 dark:text-teal-400" />
          <p>{title}</p>
        </ModalHeader>
        <ModalBody>
          <form>
            {data.map((input, index) => {
              return input.name != "createdAt" && input.name != "finalDate" ? (
                <Input
                  key={index}
                  type={input.type}
                  label={input.label}
                  name={input.name}
                  defaultValue={selectedItem[`${input.name}`]}
                  className="mb-5"
                  {...control(`${input.name}`, {
                    required: "el campo es onligatorio",
                  })}
                  isInvalid={!!errors[input.name]}
                  errorMessage={errors[input.name]?.message || ""}
                />
              ) : (
                <Input
                  key={index}
                  type={input.type}
                  name={input.name}
                  defaultValue={
                    selectedItem[`${input.name}`].toString().split("T")[0]
                  }
                  className="mb-5"
                  {...control(`${input.name}`, {
                    required: "el campo es onligatorio",
                  })}
                  disabled
                />
              );
            })}
          </form>
        </ModalBody>
        <ModalFooter className="bg-teal-600">
          <Button
            variant="light"
            onPress={onClose}
            className="text-white"
            aria-label="Cerrar"
          >
            Cerrar
          </Button>
          <Button
            color="primary"
            className="text-teal-800 bg-white"
            aria-label="Agregar Transfer"
            onPress={onSubmit}
            isDisabled={isValid}
          >
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
