import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ExpensesSummary({ expenses, periodName }) {

  const totalIncome = expenses?.reduce((sum, expense) => {
    if (expense.type === "Income") {
      return sum + expense.amount;
    }
    return sum;
  }, 0);


  const totalExpense = expenses?.reduce((sum, expense) => {
    if (expense.type === "Expense") {
      return sum + expense.amount;
    }
    return sum;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <View style={styles.section}>
        <Text style={styles.income}>Income: ${totalIncome.toFixed(2)}</Text>
        <Text style={styles.expense}>Expense: ${totalExpense.toFixed(2)}</Text>
      </View>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
    textAlign: "center",
    fontWeight: "bold",
  },
  income: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
    marginVertical: 4,
  },
  expense: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.error500,
    marginVertical: 4,
  },
});
