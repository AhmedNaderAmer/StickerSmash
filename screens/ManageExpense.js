import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";

import IconButton from "../components/UI/IconButton";
import {
  deleteItemById,
  getItemById,
  storeData,
  updateItemById,
} from "../util/AsyncStorage";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [selectedExpense, setSelectedExpense] = useState();
  async function getItem() {
    const selectedItem = await getItemById(editedExpenseId);
    setSelectedExpense(selectedItem);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
    if (editedExpenseId) {
      getItem();
    }
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    await deleteItemById(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      await updateItemById(editedExpenseId, expenseData);
    } else {
      await storeData({
        id: `e${Math.random()}`,
        description: expenseData.description,
        type: expenseData.type,
        amount: expenseData.amount,
        category: expenseData.category,
        date: expenseData.date,
      });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
