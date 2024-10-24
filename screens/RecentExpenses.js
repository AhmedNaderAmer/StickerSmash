import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { getData } from "../util/AsyncStorage";
import { getDateMinusDays } from "../util/DateFormat";
import { useFocusEffect } from "@react-navigation/native";

export default function RecentExpenses() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const item = await getData("transaction");
      const sortedData = item?.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(sortedData || []); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const recentExpenses = data?.filter((expense) => {
    const today = new Date();
    const date30DaysAgo = getDateMinusDays(today, 30);
    const expenseDate = new Date(expense.date);

    return (expenseDate >= date30DaysAgo);
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 30 Days"
      fallbackText="No expenses registered for the last 30 days."
    />
  );
}
