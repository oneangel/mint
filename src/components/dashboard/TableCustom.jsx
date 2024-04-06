import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import {
  IoArrowUpOutline,
  IoArrowDownSharp,
  IoEllipsisVertical,
  IoPencilSharp,
  IoTrash,
  IoEyeOutline,
} from "react-icons/io5";
import { format } from "date-fns";
import { FaPen } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export const TableCustom = ({ columns, data }) => {
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
    <Table className="max-h-[600px]">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className="text-xl text-neutral-800">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} emptyContent={"No transacciones aún."}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="text-xl pt-8">
                {columnKey === "acciones" ? (
                  <div className="relative flex items-center gap-2 ml-4">
                    <Tooltip content="Detalles">
                      <span className="text-2xl pt-1 text-default-400 cursor-pointer active:opacity-50">
                        <MdOutlineRemoveRedEye />
                      </span>
                    </Tooltip>
                    <Tooltip content="Editar">
                      <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                        <FaPen />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar">
                      <span className="text-xl text-danger cursor-pointer active:opacity-50">
                        <IoTrash />
                      </span>
                    </Tooltip>
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
  );
};
