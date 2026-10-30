import { View, StyleSheet, FlatList, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { useExpenseStore } from "../../store/expenseStore";
import BalanceCard from "../../components/BalanceCard";
import ExpenseRow from "../../components/ExpenseRow";
import AddExpenseForm from "../../components/AddExpenseForm";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("");

  //we pull all data from the store
  const { expenses, balance, loadData, addExpense, deleteExpense } = useExpenseStore();


  //load data on app start
  useEffect(() => {
    loadData();
  },[]);

  const filteredExpenses = expenses.filter ( expense => 
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <KeyboardAvoidingView 
      style = {styles.container}
      behavior = {Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset = {Platform.OS === "ios" ? 20 : 0}
      contentContainerStyle = {{ flex : 1}}
    > 

      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View>
          <Text style = { styles.pageTitle}>
            Expense Tracker
          </Text>
          <BalanceCard balance = {balance} />
          <AddExpenseForm onAddExpense = {addExpense} />
          <Text style = {styles.subtitle}>
            Recent Expenses
          </Text>
        </View>
      </TouchableWithoutFeedback>   

      <TextInput 
        style = {styles.searchInput}
        placeholder = "Search expenses"
        placeholderTextColor = "#9A92A6"
        value = {searchQuery}
        onChangeText = {setSearchQuery}
      />
             
      <FlatList
        data = {filteredExpenses}
        keyExtractor = { item => item.id }
        renderItem = {({ item }) => (
          <ExpenseRow
            id = {item.id}
            description = {item.description}
            amount = {item.amount}
            onDelete = {() => deleteExpense(item.id, item.amount)}
          />
        )}

        keyboardShouldPersistTaps = "handled"
        keyboardDismissMode = "on-drag"
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
    backgroundColor: "#FAFAFC",
    paddingTop:40
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "800",
    color:"2D1B4E",
    marginTop: 0,
    marginBottom: 12
  },
  listContainer: {
    flex: 1
  },
  searchInput: {
    backgroundColor: "#F4F3F8",
    borderWidth: 1,
    borderColor: "#E2DFEC",
    paddingHorizontal: 12,
    paddingVertical : 12,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 16,
    color: "#1F1235",
    fontWeight: "500"
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#2D1B4E",
    marginBottom: 24,
    letterSpacing: 0.5,
    textAlign: "center"
  }
})