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

export const AddModal = ({ isOpen, onClose, title, data, control }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col items-center justify-center text-center">
          <GiSwapBag className="text-teal-600 size-40 dark:text-teal-400" />
          <p>{title}</p>
        </ModalHeader>
        <ModalBody>
          <form>
            {data.map((input, index) => {
              return input.name != "createdAt" ? (
                <Input
                  key={index}
                  type={input.type}
                  label={input.label}
                  name={input.name}
                  className="mb-5"
                  {...control(`${input.name}`, {
                    required: "el campo es onligatorio",
                  })}
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
          >
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
