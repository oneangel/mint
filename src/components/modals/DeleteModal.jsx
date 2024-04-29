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
import { MdDeleteForever } from "react-icons/md";

export const DeleteModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  onDelete,
  type,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col items-center justify-center text-center">
          <MdDeleteForever className="text-red-600 size-40 dark:text-red-600" />
          <p>{title}</p>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-500 text-center">{subtitle}</p>
          <p className="text-gray-500 text-center mb-4">Estas seguro?</p>
        </ModalBody>
        <ModalFooter className="bg-red-600">
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
            className="text-red-800 bg-white"
            aria-label="Agregar Transfer"
            onPress={onDelete}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
