import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import ExpensesOutput from "../components/ExpensesOutput";
import { getData } from "../util/AsyncStorage"; 
import { useFocusEffect } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";

const AllExpenses = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("date"); 
  const [filterOption, setFilterOption] = useState("all"); 
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const item = await getData("transaction"); 
      setData(item || []); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (!loading) {
      let updatedData = [...data];

      if (filterOption !== "all") {
        updatedData = updatedData.filter(
          (item) => item.type.toLowerCase() === filterOption.toLowerCase()
        );
      }

      if (sortOption === "date") {
        updatedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortOption === "amount") {
        updatedData.sort((a, b) => b.amount - a.amount);
      }

      setFilteredData(updatedData);
      console.log("Filtered and Sorted Data:", updatedData);
    }
  }, [data, sortOption, filterOption, loading]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View >
            <View>
              <Text style={styles.label}>Sort By:</Text>
              <Picker
                style={styles.input}
                selectedValue={sortOption}
                onValueChange={(itemValue) => setSortOption(itemValue)}
              >
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Amount" value="amount" />
              </Picker>
            </View>
            <View>
            <Text style={styles.label}>Filter By:</Text>
            <Picker
              style={styles.input}
              selectedValue={filterOption}
              onValueChange={(itemValue) => setFilterOption(itemValue)}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Income" value="Income" />
              <Picker.Item label="Expense" value="Expense" />
            </Picker></View>
          </View>
          {/* Render ExpensesOutput only when filteredData is available */}
          {filteredData.length > 0 ? (
            <ExpensesOutput
              expenses={filteredData}
              expensesPeriod="Total"
              fallbackText="No registered expenses found!"
            />
          ) : (
            <Text>No transactions available.</Text>
          )}
        </>
      )}
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
});
