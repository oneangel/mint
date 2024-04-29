import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import Percentage from "../charts/Percentage";
import { FaPiggyBank } from "react-icons/fa6";

export const SelectedGoal = ({ selectedGoal, setShowAddAmountModal }) => {
  return (
    <Card className="h-[340px] shadow-md rounded-3xl border-1 w-full dark:bg-[#2C2F42] dark:border-zinc-800">
      {selectedGoal.description == "Ninguna" && (
        <CardBody className="flex flex-wrap justify-center w-full gap-5">
          <p className="text-xl text-center">
            No hay ninguna meta seleccionada
          </p>
        </CardBody>
      )}
      {selectedGoal.description != "Ninguna" && (
        <>
          <CardHeader className="flex gap-3">
            <span className="text-5xl">
              <FaPiggyBank />
            </span>
            <div className="flex flex-col">
              <p className="text-md">Meta seleccionada</p>
              <p className="text-small text-default-500">
                {selectedGoal.description}
              </p>
            </div>
            <Button
              isDisabled={selectedGoal.amount == selectedGoal.amountGoal}
              color="primary"
              radius="full"
              size="sm"
              variant="solid"
              className="ml-5 bg-sky-700"
              onPress={() => setShowAddAmountModal(true)}
            >
              Abonar
            </Button>
          </CardHeader>

          <CardBody className="flex flex-wrap items-center justify-center w-full gap-5">
            <div className="flex flex-col w-40 items-left">
              <Percentage
                value={selectedGoal.amount}
                max={selectedGoal.amountGoal}
              />
            </div>
            <div className="flex flex-col w-90">
              <div className="w-60">
                <p className="text-md text-default-500">•Monto actual:</p>
                <p className="text-2xl">${selectedGoal.amount}</p>
                <p>Ultimo abono de 30%</p>
              </div>
              <div className="mt-4 w-60">
                <p className="text-md text-default-500">•Meta:</p>
                <p className="text-2xl">${selectedGoal.amountGoal}</p>
                <p>Ultimo abono de 30%</p>
              </div>
            </div>
          </CardBody>
        </>
      )}
    </Card>
  );
};
