import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { IoArrowUpOutline, IoArrowDownSharp, IoTrash } from "react-icons/io5";
import { format } from "date-fns";
import { FaPen } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useForm } from "react-hook-form";

export const TableCustom = ({ columns, data, onDelete, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    description: "",
    amount: "",
    destination: "",
    createdAt: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setShowEditModal(false);
    onUpdate(selectedItemId, data);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const getStatusIcon = (type) => {
    if (type === "income") {
      return <IoArrowUpOutline className="text-green-500" />;
    } else if (type === "expense") {
      return <IoArrowDownSharp className="text-red-500" />;
    }
  };

  return (
    <>
      <Table className="max-h-[600px]">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-xl text-neutral-800 dark:text-neutral-200">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data} emptyContent={"No existen transacciones registradas aún."}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell className="pt-8 text-xl">
                  {columnKey === "acciones" ? (
                    <div className="relative flex items-center gap-2 ml-4">
                      <Tooltip content="Detalles">
                        <span className="pt-1 text-2xl cursor-pointer text-default-400 active:opacity-50">
                          <MdOutlineRemoveRedEye />
                        </span>
                      </Tooltip>
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          setSelectedItemId(item._id);
                          setShowEditModal(true);
                        }}
                      >
                        <Tooltip content="Editar">
                          <span className="text-xl cursor-pointer text-default-400 active:opacity-50">
                            <FaPen />
                          </span>
                        </Tooltip>
                      </div>

                      <div
                        onClick={() => {
                          setSelectedItemId(item._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Tooltip color="danger" content="Eliminar">
                          <span className="text-xl cursor-pointer text-danger active:opacity-50">
                            <IoTrash />
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    columnKey === "type" && (
                      <div className="flex items-center">
                        {console.log(item._id)}
                        {getStatusIcon(item.type)}
                        <span className="ml-1">
                          {getKeyValue(
                            item.type === "income" ? "Ingreso" : "Gasto",
                            columnKey
                          )}
                        </span>
                      </div>
                    )
                  )}

                  {columnKey === "createdAt" && (
                    <span>{formatDate(getKeyValue(item, columnKey))}</span>
                  )}

                  {columnKey != "type" && columnKey != "createdAt" && (
                    <span>{getKeyValue(item, columnKey)}</span>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={showEditModal} onOpenChange={setShowEditModal}>
        <ModalContent>
          <ModalHeader>Editar transacción</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input
                type="text"
                label="Descripción"
                name="description"
                className="mb-5"
                defaultValue={selectedItem.description}
                {...register("description")}
              />
              <Input
                type="number"
                label="Cantidad"
                name="amount"
                className="mb-5"
                defaultValue={selectedItem.amount}
                {...register("amount")}
              />
              <Input
                type="text"
                label="Destinatario"
                name="destination"
                className="mb-5"
                description="*A quien esta dirigido el monto"
                defaultValue={selectedItem.destination}
                {...register("destination")}
              />
              <Input
                type="date"
                name="createdAt"
                defaultValue={selectedItem.createdAt.toString().split("T")[0]}
                className="mb-5"
                readOnly
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Guardar cambios
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Modal de eliminación */}
      <Modal isOpen={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <ModalContent>
          <ModalHeader>Eliminar transacción</ModalHeader>
          <ModalBody>¿Estas seguro de eliminar la transacción?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onPress={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={() => {
                onDelete(selectedItemId);
                setShowDeleteModal(false);
                setSelectedItemId(null);
              }}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
