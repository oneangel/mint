import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { IoTrash } from "react-icons/io5";
import { FaPen } from "react-icons/fa";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export const TableCustomW = ({
  columns,
  data,
  setSelectedGoal,
  setSelectedItemId,
  setSelectedItem,
  onOpenD,
  onOpenU,
}) => {
  return (
    <Table
      className="max-h-[600px]"
      classNames={{
        wrapper: "dark:bg-[#2D3141]",
        th: "dark:bg-[#2D3141]",
      }}
      selectionMode="single"
      aria-label="Lista de Metas"
      defaultSelectedKeys={["1"]}
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
        emptyContent={"No existen metas registradas aún."}
      >
        {(item) => (
          <TableRow
            key={item.idGoal}
            onClick={() => {
              setSelectedGoal(item);
              setSelectedItemId(item._id);
            }}
          >
            {(columnKey) => (
              <TableCell className="pt-8 text-xl">
                {columnKey === "acciones" ? (
                  <div className="relative flex items-center gap-2 ml-4">
                    <div
                      onClick={() => {
                        setSelectedItemId(item._id);
                        onOpenU();
                        setSelectedItem(item);
                      }}
                    >
                      <Tooltip content="Editar" aria-label="Editar">
                        <span className="text-xl cursor-pointer text-default-400 active:opacity-50">
                          <FaPen />
                        </span>
                      </Tooltip>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedItemId(item._id);
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
                ) : columnKey === "state" ? (
                  <Chip
                    className="capitalize"
                    color={statusColorMap[item.state]}
                    size="sm"
                    aria-label="Estado"
                    variant="flat"
                  >
                    {item.state ? "Activo" : "Finalizada"}
                  </Chip>
                ) : columnKey === "finalDate" ? (
                  item.finalDate ? (
                    <span className="ml-2 font-normal text-default-700">
                      {new Date(item.finalDate).toISOString().slice(0, 10)}
                    </span>
                  ) : null
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
