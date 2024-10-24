import AsyncStorage from "@react-native-async-storage/async-storage";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    type: "Income",
    description: "side work",
    amount: 59.99,
    date: new Date("2024-10-19"),
  },
  {
    id: "e2",
    type: "Income",
    description: "dad",
    amount: 89.29,
    date: new Date("2024-10-05"),
  },
  {
    id: "e3",
    type: "Expense",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-10-01"),
  },
  {
    id: "e4",
    type: "Expense",
    description: "A book",
    amount: 14.99,
    date: new Date("2024-10-20"),
  },
  {
    id: "e5",
    type: "Expense",
    description: "Another book",
    amount: 18.59,
    date: new Date("2024-10-18"),
  },
  {
    id: "e6",
    type: "Expense",
    description: "test",
    amount: 2,
    date: new Date("2024-08-10"),
  },
  {
    id: "h1",
    type: "Expense",
    description: "nader",
    amount: 333,
    date: new Date("2024-01-10"),
  },
];

export const storeData = async (newItem) => {
  try {

    const transactions = await getData("transaction");


    if (!Array.isArray(transactions)) {
      console.error("Transactions is not an array:", transactions);
      return;
    }
    // newItem.id= `e${Math.random()}`;
    const updatedTransactions = [...transactions, newItem];

    await AsyncStorage.setItem(
      "transaction",
      JSON.stringify(updatedTransactions)
    );

    console.log(`New transaction added successfully.`);
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("getData",value)
    return value != null ? JSON.parse(value) : DUMMY_EXPENSES;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const getItemById = async (id) => {
  try {

    const transactions = await getData("transaction");

    if (!Array.isArray(transactions)) {
      console.error("Transactions is not an array:", transactions);
      return null;
    }


    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );

    if (!transaction) {
      console.log(`Transaction with ID ${id} not found.`);
      return null;
    }

    console.log(`Transaction with ID ${id} found:`, transaction);
    return transaction; 
  } catch (error) {
    console.error("Error retrieving item:", error);
    return null;
  }
};

export const deleteItemById = async (id) => {
  try {
    const transactions = await getData("transaction");

    if (!Array.isArray(transactions)) {
      console.error("Transactions is not an array:", transactions);
      return;
    }

    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    
    await AsyncStorage.setItem(
      "transaction",
      JSON.stringify(updatedTransactions)
    );

    console.log(`Transaction with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

export const updateItemById = async (id, updatedItem) => {
  try {

    const transactions = await getData("transaction");


    if (!Array.isArray(transactions)) {
      console.error("Transactions is not an array:", transactions);
      return;
    }


    const index = transactions.findIndex(
      (transaction) => transaction.id === id
    );


    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updatedItem };


      await AsyncStorage.setItem("transaction", JSON.stringify(transactions));

      console.log(`Transaction with ID ${id} updated successfully.`);
    } else {
      console.error(`Transaction with ID ${id} not found.`);
    }
  } catch (error) {
    console.error("Error updating item:", error);
  }
};
