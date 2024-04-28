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

export const AddModal = ({
  isOpen,
  onClose,
  title,
  data,
  control,
  onSubmit,
  isValid,
  icon,
  errors,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col items-center justify-center text-center">
          {icon}
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
                  className="mb-5"
                  {...control(`${input.name}`, {
                    required: "el campo es onligatorio",
                  })}
                  isInvalid={!!errors[input.name]}
                  errorMessage={errors[input.name]?.message || ""}
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
