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
import { IoReloadCircle } from "react-icons/io5";

export const RecoverModal = ({ isOpen, onClose, title, onRecover }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col items-center justify-center text-center">
          <IoReloadCircle className="text-blue-600 size-40 dark:text-teal-400" />
          <p>{title}</p>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-500 text-center">
            Esto recuperara tu transaccion
          </p>
          <p className="text-gray-500 text-center mb-4">Estas seguro?</p>
        </ModalBody>
        <ModalFooter className="bg-blue-600">
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
            className="text-blue-800 bg-white"
            aria-label="Agregar Transfer"
            onPress={onRecover}
          >
            Recuperar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
