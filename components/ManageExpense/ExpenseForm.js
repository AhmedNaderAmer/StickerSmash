import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/DateFormat";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    type: {
      value: defaultValues ? defaultValues.type : "Income",
      isValid: true,
    },
    category: {
      value: defaultValues ? defaultValues.category : "",
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      setInputValues({
        type: {
          value: defaultValues ? defaultValues.type : "",
          isValid: !!defaultValues,
        },
        category: {
          value: defaultValues.category ? defaultValues.category : "",
          isValid: !!defaultValues,
        },
        amount: {
          value: defaultValues ? defaultValues.amount.toString() : "",
          isValid: !!defaultValues,
        },
        date: {
          value: defaultValues ? getFormattedDate(defaultValues.date) : "",
          isValid: !!defaultValues,
        },
        description: {
          value: defaultValues ? defaultValues.description : "",
          isValid: !!defaultValues,
        },
      });
    }
  }, [defaultValues]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      type: inputValues.type.value,
      category: inputValues.category.value,
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const typeIsValid = expenseData.type;
    const categoryIsValid = expenseData.category.trim().length > 0;
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    
    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !categoryIsValid ||
      !typeIsValid
    ) {

      setInputValues((curInputs) => {
        return {
          type: { value: curInputs.type.value, isValid: typeIsValid },
          category: {
            value: curInputs.category.value,
            isValid: categoryIsValid,
          },
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }
  const formIsInvalid =
    !inputValues.type.isValid ||
    !inputValues.category.isValid ||
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <Input
        label="Type"
        type="picker"
        textInputConfig={{
          selectedValue: inputValues.type.value,
          onValueChange: inputChangedHandler.bind(this, "type"),
          options: [
            { label: "Income", value: "Income" },
            { label: "Expense", value: "Expense" },
          ],
        }}
      />
      <Input
        label="Category"
        invalid={!inputValues.category.isValid}
        textInputConfig={{
          placeholder: "Enter category",
          onChangeText: inputChangedHandler.bind(this, "category"),
          value: inputValues.category.value,
        }}
      />
      <Input
        label="Amount"
        invalid={!inputValues.amount.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputValues.amount.value,
        }}
      />
      <Input
        label="Date"
        invalid={!inputValues.date.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputValues.date.value,
        }}
      />
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    marginVertical: 6,
    textAlign: "center",
  },
});
