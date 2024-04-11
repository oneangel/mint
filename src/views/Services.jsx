import React, { useState } from "react";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import GaugeChart from "../components/charts/GaugeChart";
import { IoFlash, IoWater, IoAddCircle } from "react-icons/io5";
import LiquidFillChart from "../components/charts/LiquidFillChart";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import {
  useMonthMeasure,
  useGetTariffCost,
  useGetTariffWCost,
} from "../hooks/service.hooks";
import { useQuery, useMutation } from "react-query";
import { useGetTariffs } from "../hooks/tariff.hooks";
import { useForm } from "react-hook-form";
import { useLinkMeter } from "../hooks/meter.hooks";

export const Services = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const serial = localStorage.getItem("serial");

  const [showModal, setShowModal] = useState(false);

  const {
    data: measureData,
    isLoading: isLoadingMeasure,
    isError: isErrorMeasure,
  } = useQuery("measure", useMonthMeasure);

  const {
    data: tariffData,
    isLoading: isLoadingTariff,
    isError: isErrorTariff,
  } = useQuery("tariff", useGetTariffCost);

  const {
    data: tariffWData,
    isLoading: isLoadingTariffW,
    isError: isErrorTariffW,
  } = useQuery("tariffw", useGetTariffWCost);

  const {
    data: tariffsData,
    isLoading: isLoadingTariffs,
    isError: isErrorTariffs,
  } = useQuery("tariffs", useGetTariffs);

  const linkMeterMutation = useMutation(useLinkMeter, {
    onSuccess: () => {
      queryClient.refetchQueries("measure");
      queryClient.refetchQueries("tariff");
      queryClient.refetchQueries("tariffw");
      queryClient.refetchQueries("tariffs");
    },

    onError: () => {
      toast.error("¡Hubo un error en la operacion!");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    linkMeterMutation.mutate(data);
    setShowModal(false);
  };

  return (
    <div className="h-screen bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />
      <h1 className="text-4xl font-semibold pl-20 text-sky-700 pt-32 dark:text-white">
        Servicios
      </h1>
      <div className="mx-20 flex flex-wrap h-[700px]">
        {!isLoadingMeasure &&
          !isLoadingTariff &&
          !isLoadingTariffW &&
          !isLoadingTariffs &&
          !measureData &&
          !tariffData &&
          !tariffsData &&
          !tariffWData && (
            <>
              <h1 className="text-6xl font-semibold pl-20 text-sky-700 pt-20 dark:text-white">
                ¡No hay un medidor asociado!
              </h1>
              <Button
                className="w-full text-xl text-white h-14 bg-sky-700"
                startContent={<IoAddCircle className="text-white size-6" />}
                aria-label="Agregar"
                onClick={() => setShowModal(true)}
              >
                Agregar
              </Button>

              <Modal isOpen={showModal} onOpenChange={setShowModal}>
                <ModalContent>
                  <ModalHeader>Asociar medidor</ModalHeader>
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                      <Input
                        type="text"
                        label="Número serial"
                        name="serial"
                        className="mb-5"
                        {...register("serial", {
                          required: "El campo es requerido",
                        })}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        disabled={!isValid}
                        color="primary"
                        onPress={handleSubmit(onSubmit)}
                      >
                        Guardar cambios
                      </Button>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => setShowModal(false)}
                      >
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            </>
          )}

        {!isLoadingMeasure &&
          !isLoadingTariff &&
          !isLoadingTariffW &&
          !isLoadingTariffs &&
          measureData &&
          tariffData &&
          tariffsData &&
          tariffWData && (
            <>
              <div className="w-1/2 flex justify-center items-center">
                <div className="w-[70%] bg-white h-[90%] rounded-3xl border-1 border-default-300 shadow-md dark:bg-zinc-900 dark:border-zinc-800 items-center">
                  <p className="pt-10 pl-10 flex items-center text-2xl font-bold text-default-700">
                    <span>
                      <IoWater className="size-8" />
                    </span>
                    Agua
                  </p>
                  {!isLoadingTariffW && (
                    <div className="flex items-center justify-center">
                      <LiquidFillChart litros={tariffWData.data.measure} />
                    </div>
                  )}

                  <div className="flex flex-wrap mx-10">
                    <div className="w-1/2">
                      <p className="mt-10 text-xl font-semibold">
                        Total de litros:{" "}
                        {!isLoadingTariffW && !isErrorTariffW && (
                          <span className="ml-2 text-default-400">
                            {tariffWData.data.measure}L
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="w-1/2 ">
                      <p className="text-center text-xl">Gastos</p>
                      <div className="bg-red-50 h-20 mt-2 rounded-3xl mx-4 flex items-center justify-center sha">
                        {!isLoadingTariffW && !isErrorTariffW && (
                          <p className="text-2xl font-bold text-red-700">
                            ${tariffWData.data.totalPay.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 flex justify-center items-center">
                <div className="w-[70%] bg-white h-[90%] rounded-3xl border-1 border-default-300 shadow-md dark:bg-zinc-900 dark:border-zinc-800">
                  {!measureData &&
                    !isLoadingMeasure &&
                    !isLoadingTariff &&
                    !isLoadingTariffs &&
                    !isLoadingTariffW && <p>Hola</p>}

                  {measureData && tariffData && tariffsData && tariffWData && (
                    <>
                      <p className="pt-10 pl-10 flex items-center text-2xl font-bold text-default-700">
                        <span>
                          <IoFlash className="size-8" />
                        </span>
                        Energia
                      </p>
                      <GaugeChart
                        kw={measureData.data.totalMeasure / 100}
                        basic={tariffsData.data.tariffs.basic.limit / 100}
                        middle={tariffsData.data.tariffs.middle.limit / 100}
                        excedent={
                          tariffsData.data.tariffs.basic.limit / 0.3333 / 100
                        }
                      />

                      <div className="flex flex-wrap mx-10">
                        <div className="w-1/2">
                          <p className="mt-10 text-xl font-semibold">
                            Total de kW:{" "}
                            <span className="ml-2 text-default-400">
                              {measureData.data.totalMeasure} kw
                            </span>
                          </p>
                          <p className="mt-2 text-xl font-semibold">
                            Consumo de kWh:{" "}
                            <span className="ml-2 text-default-400">Bajo</span>
                          </p>
                        </div>

                        <div className="w-1/2 ">
                          <p className="text-center text-xl">Gastos</p>
                          <div className="bg-red-50 h-20 mt-2 rounded-3xl mx-4 flex items-center justify-center sha">
                            <p className="text-2xl font-bold text-red-700">
                              ${tariffData.data.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};
