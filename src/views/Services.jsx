import React, { useState } from "react";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { Link } from "react-router-dom";
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
  Skeleton,
  Switch,
  Tabs,
  Tab,
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
import toast, { Toaster } from "react-hot-toast";
import LargeAreaChart from "../components/charts/LargeAreaChart";
import { useQueryClient } from "react-query";
import { TbDropletHalf2 } from "react-icons/tb";

export const Services = () => {
  const [selectedOption, setSelectedOption] = useState("water");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const queryClient = useQueryClient();

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
    linkMeterMutation.mutate(data);
    setShowModal(false);
  };

  return (
    <div className="h-screen overflow-auto bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />

      {!serial && (
        <>
          <h1 className="pt-20 pl-20 text-6xl font-semibold text-sky-700 dark:text-white">
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

      <div className="flex flex-col h-screen pt-20">
        {serial && (
          <>
            <div className="flex flex-col items-center w-full">
              <Tabs
                aria-label="Options"
                color="primary"
                classNames={{ cursor: "bg-sky-700" }}
                variant="bordered"
                onSelectionChange={setSelectedOption}
                selectedKey={selectedOption}
              >
                <Tab
                  key="water"
                  title={
                    <div className="flex items-center space-x-2">
                      <IoWater />
                      <span>Agua</span>
                    </div>
                  }
                >
                  <div className="items-center h-[700px] md:w-[600px] md:h-[640px] bg-white shadow-md rounded-3xl border-1 border-default-200 dark:bg-zinc-900 dark:border-zinc-800">
                    <p className="flex items-center pt-10 pl-10 text-2xl font-bold text-default-700">
                      <span>
                        <IoWater className="size-8" />
                      </span>
                      Agua
                    </p>
                    <Skeleton isLoaded={!isLoadingTariffW}>
                      {!isLoadingTariffW && (
                        <div className="flex items-center justify-center">
                          <LiquidFillChart
                          // litros={measureData ? tariffWData.data.measure : 0}
                          />
                        </div>
                      )}
                    </Skeleton>

                    <div className="flex flex-wrap mx-10">
                      <div className="w-1/2">
                        <p className="mt-10 text-xl font-semibold">
                          Total de litros:{" "}
                          {!isLoadingTariffW && (
                            <span className="ml-2 text-default-400">
                              {tariffData ? tariffData.data.measure : 0}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="w-1/2 ">
                        <p className="text-xl text-center">Gastos</p>
                        <div className="flex items-center justify-center h-20 mx-4 mt-2 bg-red-50 border-1 dark:bg-red-950 dark:border-red-800 rounded-3xl">
                          {!isLoadingTariffW && !isErrorTariffW && (
                            <p className="text-2xl font-bold text-red-700 dark:text-white">
                              $
                              {/* {tariffWData ? tariffWData.data.totalPay.toFixed(2) : 0} */}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  value="electricity"
                  title={
                    <div className="flex items-center space-x-2">
                      <IoFlash />
                      <span>Electricidad</span>
                    </div>
                  }
                >
                  <div className="items-center h-[700px] md:w-[600px] md:h-[640px] bg-white shadow-md rounded-3xl border-1 border-default-200 dark:bg-zinc-900 dark:border-zinc-800">
                    <p className="flex items-center pt-10 pl-10 text-2xl font-bold text-default-700">
                      <span>
                        <IoFlash className="size-8" />
                      </span>
                      Electricidad
                    </p>
                    {!isLoadingMeasure && !isLoadingTariffs && (
                      <div className="flex items-center justify-center">
                        <GaugeChart
                          kw={
                            measureData
                              ? measureData.data.totalMeasure / 100
                              : 0
                          }
                          basic={
                            tariffsData
                              ? tariffsData.data.tariffs.basic.limit / 100
                              : 0
                          }
                          middle={
                            tariffsData
                              ? tariffsData.data.tariffs.middle.limit / 100
                              : 0
                          }
                          excedent={
                            tariffsData
                              ? tariffsData.data.tariffs.basic.limit /
                                0.3333 /
                                100
                              : 0
                          }
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 mx-10">
                      <div className="col-span-2 md:col-span-1">
                        <p className="mt-10 text-xl font-semibold">
                          Total de kW:{" "}
                          {!isLoadingMeasure && (
                            <span className="ml-2 text-default-400">
                              {measureData ? measureData.data.totalMeasure : 0}{" "}
                              kw
                            </span>
                          )}
                        </p>
                        <p className="mt-2 text-xl font-semibold">
                          Consumo de kWh:{" "}
                          <span className="ml-2 text-default-400">Bajo</span>
                        </p>
                      </div>

                      <div className="col-span-2 md:col-span-1">
                        <p className="text-xl text-center">Gastos</p>
                        <div className="flex items-center justify-center h-20 mx-auto w-[70%] mt-6 bg-red-50 border-1 dark:bg-red-950 dark:border-red-800 rounded-3xl">
                          {!isLoadingTariff && (
                            <p className="text-2xl font-bold text-red-700 dark:text-white">
                              $
                              {tariffData
                                ? tariffData.data.total.toFixed(2)
                                : 0}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};
