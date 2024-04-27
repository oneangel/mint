import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TransferList from "../components/TransferList";
import { useQuery } from "react-query";
import {
  useGetTL,
  useGetIBD,
  useGetEBD,
  useDT,
  useUT,
} from "../hooks/transaction.hooks";
import { BarChart } from "../components/charts/BarChart";
import CustomModal from "../components/CustomModal";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAddT } from "../hooks/transaction.hooks";
import { useQueryClient } from "react-query";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import DeleteModal from "../components/DeleteModal";
import UpdateModal from "../components/UpdateModal";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const TransferScreen = () => {
  const queryClient = useQueryClient();

  const inputs = [
    {
      type: "text",
      label: "Descripción",
      name: "description",
      icon: "description"
    },
    {
      type: "number",
      label: "Cantidad",
      name: "amount",
      icon: "attach-money"
    },
    {
      type: "date",
      label: "Fecha",
      name: "createdAt",
      icon: "date-range"
    },
  ];

  const {
    data: transactionList,
    isLoading: isLoadingTransactionList,
    isError: isErrorTransactionList,
  } = useQuery("transactionList", useGetTL);

  const {
    data: incomeList,
    isLoading: isLoadingIncomeList,
    isError: isErrorIncomeList,
  } = useQuery("incomeList", useGetIBD);

  const {
    data: expenseList,
    isLoading: isLoadingExpenseList,
    isError: isErrorExpenseList,
  } = useQuery("expenseList", useGetEBD);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [selectedOption, setSelectedOption] = useState("ingresos");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const addTransactionMutation = useMutation(useAddT, {
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Transacción agregada",
        textBody: "La transaccion fue agregada exitosamente",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
      queryClient.refetchQueries("expenseList");
      queryClient.refetchQueries("incomeList");
      queryClient.refetchQueries("transactionList");
    },
    onError: (error) => {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "¡Ocurrio un error inesperado!",
        textBody: "Por favor, Intenta nuevamente",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
    },
  });

  const deleteTransactionMutation = useMutation(useDT, {
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Transacción Eliminada",
        textBody: "La transaccion fue eliminada exitosamente",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
      queryClient.refetchQueries("expenseList");
      queryClient.refetchQueries("incomeList");
      queryClient.refetchQueries("transactionList");
    },

    onError: (error) => {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "¡Ocurrio un error inesperado!",
        textBody: "Por favor, Intenta nuevamente",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
    },
  });

  const updateTransactionMutation = useMutation(useUT, {
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Transacción Actualizada",
        textBody: "La transaccion fue actualizada exitosamente",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
      queryClient.refetchQueries("expenseList");
      queryClient.refetchQueries("incomeList");
      queryClient.refetchQueries("transactionList");
    },

    onError: (error) => {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "¡Ocurrio un error inesperado!",
        textBody: "Por favor, Intenta nuevamente",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
    },
  });

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const toggleDeleteModal = () => {
    setIsVisibleDelete(!isVisibleDelete);
  };

  const toggleUpdateModal = () => {
    setIsVisibleUpdate(!isVisibleUpdate);
  };

  const onSubmit = (data) => {
    toggleModal();
    addTransactionMutation.mutate(data);
  };

  const onDelete = (id) => {
    setSelectedItem({});
    toggleDeleteModal();
    deleteTransactionMutation.mutate(id);
  };

  const onUpdate = (data) => {
    setSelectedItem({});
    toggleUpdateModal();
    updateTransactionMutation.mutate(data);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          top: 20,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#3E70A1" }}>Transacciones</Text>
        <Image
          source={require("../../assets/Icons/mint1.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleOptionChange("ingresos")}>
          <Text
            style={[
              styles.optionText,
              selectedOption === "ingresos" && styles.selectedOption,
            ]}
          >
            Ingresos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionChange("gastos")}>
          <Text
            style={[
              styles.optionText,
              selectedOption === "gastos" && styles.selectedOption,
            ]}
          >
            Gastos
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {!isLoadingIncomeList && !isLoadingExpenseList && (
          <BarChart
            type={selectedOption === "ingresos" ? "incomes" : "expenses"}
            data={selectedOption === "ingresos" ? incomeList : expenseList}
          />
        )}
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.h3}>Transacciones</Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ maxHeight: 160, maxHeight: 230 }}>
        {!isLoadingTransactionList && (
          <TransferList
            data={transactionList.data}
            toggleModal={toggleDeleteModal}
            toggleModalUp={toggleUpdateModal}
            setItem={setSelectedItem}
          />
        )}
      </ScrollView>

      <CustomModal
        title="Agregar transaccion"
        subtitle="Estas a punto de agregar una transaccion."
        icon={<FontAwesome5
          name="hand-holding-usd"
          size={65}
          color="#fff"
          style={{ textAlign: "center", marginBottom: 15 }}
        />}
        data={inputs}
        setValue={setValue}
        isVisible={isVisible}
        toggleModal={toggleModal}
        onSubmit={handleSubmit(onSubmit)}
      />
      <DeleteModal
        isVisible={isVisibleDelete}
        title="Estas a punto de eliminar esta transaccion"
        subtitle="Esta transaccion sera eliminada para siempre"
        toggleModal={toggleDeleteModal}
        onDelete={() => onDelete(selectedItem._id)}
      />
      <UpdateModal
        isVisible={isVisibleUpdate}
        setItem={setSelectedItem}
        toggleModal={toggleUpdateModal}
        onUpdate={onUpdate}
        item={selectedItem}
        setValue={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FDFE",
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bcbcbc",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerImage: {
    width: 80,
    height: 80,
    tintColor: "#3E70A1",
    alignSelf: "center",
    top: 4
  },
  optionsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 20,
  },
  optionText: {
    fontSize: 18,
    color: "gray",
  },
  selectedOption: {
    fontWeight: "bold",
    color: "#000",
  },
  h3: {
    color: "#363636",
    fontSize: 25,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 25,
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopColor: "#ccc",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingStart: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TransferScreen;
