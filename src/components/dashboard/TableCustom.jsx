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
} from "@nextui-org/react";
import { IoArrowUpOutline, IoArrowDownSharp } from "react-icons/io5";
import { format } from "date-fns";

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
                  <div className="flex items-center">
                    <Dropdown>
                      <DropdownTrigger>
                        <span>
                          <IoEllipsisVertical className="text-neutral-500 ml-8" />
                        </span>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="edit"
                          startContent={<IoPencilSharp />}
                        >
                          Editar
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={<IoTrash />}
                        >
                          Eliminar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
