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
  Pagination,
} from "@nextui-org/react";
import { IoArrowUpOutline, IoArrowDownSharp, IoTrash } from "react-icons/io5";
import { GrCycle } from "react-icons/gr";
import { format } from "date-fns";
import { FaPen } from "react-icons/fa";

export const TableCustom = ({
  columns,
  data,
  onOpenD,
  onOpenU,
  onOpenR,
  setSelectedItemId,
  setSelectedItem,
  currentPage,
  handlePageChange,
  total,
}) => {
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
      <Table
        className="max-h-[600px]"
        classNames={{
          wrapper: "dark:bg-[#2C2F42]",
          th: "dark:bg-[#2D3141]",
          td: "dark:bg-[#2D3141]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="text-xl text-neutral-800 dark:text-neutral-200"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data}
          emptyContent={"No existen transacciones registradas aún."}
        >
          {(item) => (
            <TableRow
              key={item._id}
              className={` ${
                item.status
                  ? ""
                  : "bg-gray-200 opacity-50 cursor-not-allowed rounded"
              }`}
            >
              {(columnKey) => (
                <TableCell className="pt-8 text-xl" aria-label="table-cell">
                  {columnKey === "acciones" && (
                    <div className="relative flex items-center gap-2 ml-4">
                      {item.status && (
                        <div
                          onClick={() => {
                            setSelectedItem(item);
                            setSelectedItemId(item._id);
                            onOpenU();
                          }}
                        >
                          <Tooltip content="Editar">
                            <span className="text-xl cursor-pointer text-default-400 active:opacity-50">
                              <FaPen />
                            </span>
                          </Tooltip>
                        </div>
                      )}

                      {!item.status && (
                        <div
                          onClick={() => {
                            setSelectedItemId(item._id);
                            onOpenR();
                          }}
                        >
                          <Tooltip content="Recuperar" aria-label="tool-tip">
                            <span className="text-xl cursor-pointer text-default-400 active:opacity-50">
                              <GrCycle />
                            </span>
                          </Tooltip>
                        </div>
                      )}

                      <div
                        onClick={() => {
                          setSelectedItemId(item._id);
                          setSelectedItem(item);
                          onOpenD();
                        }}
                      >
                        <Tooltip color="danger" content="Eliminar">
                          <span className="text-xl cursor-pointer text-danger active:opacity-50">
                            <IoTrash />
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  )}

                  {columnKey === "type" && (
                    <div className="flex items-center">
                      {getStatusIcon(item.type)}
                      <span className="ml-1">
                        {getKeyValue(
                          item.type === "income" ? "Ingreso" : "Gasto",
                          columnKey
                        )}
                      </span>
                    </div>
                  )}

                  {columnKey === "createdAt" && (
                    <span>
                      {new Date(item.createdAt).toISOString().slice(0, 10)}
                    </span>
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

      <Pagination
        showControls
        className="flex justify-end mt-2"
        classNames={{
          item: "dark:bg-[#2C2F42]",
          next: "dark:bg-[#2C2F42]",
          prev: "dark:bg-[#2C2F42]",
        }}
        total={total}
        current={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};
