import { View, StyleSheet, FlatList, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BalanceCard from "../../components/BalanceCard";
import ExpenseRow from "../../components/ExpenseRow";
import AddExpenseForm from "../../components/AddExpenseForm";

type Expense = {
  id : string;
  description: string;
  amount: number;
}

export default function App() {

  const [balance, setBalance ] = useState<number>(5000);
  const [expenses, setExpenses ] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  //load data on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem("expenses");
        const savedBalance = await AsyncStorage.getItem("balance");

        //convert string to js array
        if(savedExpenses) {
          setExpenses(JSON.parse(savedExpenses));
        }

        //convert string to number
        if(savedBalance) {
          setBalance(JSON.parse(savedBalance));
        }
      } catch ( error ) {
        console.log("Failed to load data", error);
      }
    };

    loadData();
  }, []);

  //function to save data
  const saveData = async (newExpenses: Expense[], newBalance: number) => {
     try {
      await AsyncStorage.setItem("expenses", JSON.stringify(newExpenses));
      await AsyncStorage.setItem("balance", JSON.stringify(newBalance));
     } catch (error) {
      console.log("Failed to save data", error);
     }
  };

  //receive data from AddExpenseForm
  const handleAddExpense = (description: string, amount: number) => {
  
    //new expense object with unique id
    const newExpense: Expense = {
      id: Math.random().toString(),
      description: description,
      amount: amount
    };

    setBalance(currentBalance => {
      const newBalance = currentBalance - amount;

      setExpenses(currentExpenses => {
        const newExpenses = [newExpense, ...currentExpenses];
        saveData(newExpenses, newBalance);
        return newExpenses;
      });

      return newBalance;
    });
  };

  const handleDeleteExpense = (id: string, amount: number) => {
    setBalance(currentBalance => {
      const newBalance = currentBalance + amount;

      setExpenses( currentExpenses => {
        const newExpenses = currentExpenses.filter( expense => expense.id !== id);

        saveData(newExpenses, newBalance);
        return newExpenses;
      })

      return newBalance;
    })
  }

  const filteredExpenses = expenses.filter ( expense => 
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <KeyboardAvoidingView 
      style = {styles.container}
      behavior = {Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data = {filteredExpenses}
        keyExtractor = { item => item.id }

        ListHeaderComponent = {
          <>
            <BalanceCard balance = {balance} />
            <AddExpenseForm onAddExpense = {handleAddExpense} />
            <Text style = {styles.subtitle}>
              Recent Expenses
            </Text>

            <TextInput 
              style = {styles.searchInput}
              placeholder = "Search expenses"
              placeholderTextColor = "#0e0808"
              value = {searchQuery}
              onChangeText = {setSearchQuery}
            />
          </>
        }

        renderItem = {({ item }) => (
          <ExpenseRow
            id = {item.id}
            description = {item.description}
            amount = {item.amount}
            onDelete = {() => handleDeleteExpense(item.id, item.amount)}
          />
        )}

        keyboardShouldPersistTaps = "handled"
        style = {styles.listContainer}
        contentContainerStyle = {{ paddingBottom: 120 }}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop:50
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },
  listContainer: {
    flex: 1
  },
  searchInput: {
    backgroundColor: "#cab2af",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  }
})