import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { DateFormat } from "../util/DateFormat";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, amount, date, type }) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <View style={{display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
            <Text style={[styles.textBase, styles.description]}>
              {description}
            </Text>
            <Text style={[styles.textBase, styles.type]}>
              Type: {type}
            </Text>
          </View>
          <Text style={styles.textBase}>{DateFormat(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  type:{
    fontSize: 8,
    marginBottom: 4,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
