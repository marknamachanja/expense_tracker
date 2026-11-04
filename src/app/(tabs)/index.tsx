import { View, StyleSheet, FlatList, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { useState, useEffect } from "react";
import { useExpenseStore } from "../../store/expenseStore";
import { useExchangeRate } from "../../hooks/useExchangeRate";
import BalanceCard from "../../components/BalanceCard";
import ExpenseRow from "../../components/ExpenseRow";
import AddExpenseForm from "../../components/AddExpenseForm";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("");

  //we pull all data from the store
  const { expenses, balance, loadData, addExpense, deleteExpense, isUSD, toggleCurrency, isDarkMode, toggleDarkMode } = useExpenseStore();
  const { isLoading } = useExchangeRate();


  //load data on app start
  useEffect(() => {
    loadData();
  },[]);

  const filteredExpenses = expenses.filter ( expense => 
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const theme = isDarkMode ? {
    background : "#120A21",
    text : "#FAFAFA",
    inputBg : "#1F1235",
    border : "#392659"
  } : {
    background : "#FAFAFC",
    text : "#2D1B4E",
    inputBg : "#F4F3F8",
    border : "#E2DFEC"
  }

  return (
    <KeyboardAvoidingView 
      style = {[styles.container, { backgroundColor : theme.background }]}
      behavior = {Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset = {Platform.OS === "ios" ? 20 : 0}
      contentContainerStyle = {{ flex : 1}}
    > 

      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View>
          <View
            style = {styles.headerRow}
          >
            <Text style = { [styles.pageTitle, { color: theme.text }] }>
              Expense Tracker
            </Text>
          </View>

          <View style = { styles.togglesContainer }>
            <View style = { styles.switchContainer }>
              <Text style = { styles.switchLabel }>
                { isDarkMode ? "Dark Mode" : "Light Mode" }
                <Switch
                  value = { isDarkMode }
                  onValueChange = { toggleDarkMode }
                  trackColor = {{ false: "#E2DFEC", true: "#1F1235"}}
                />
              </Text>
            </View>
            <View
              style = { styles.switchContainer }
            >
              <Text
                style = { styles.switchLabel }
              >
                USD
              </Text>
              <Switch
                value = { isUSD }
                onValueChange = { toggleCurrency}
                trackColor = {{ false: "#E2DFEC", true: "#1F1235"}}
                disabled = { isLoading }
              />
            </View>
          </View>
          <BalanceCard balance = {balance} />
          <AddExpenseForm onAddExpense = {addExpense} />
          <Text style = {styles.subtitle}>
            Recent Expenses
          </Text>
        </View>
      </TouchableWithoutFeedback>   

      <TextInput 
        style = {[styles.searchInput, { backgroundColor : theme.inputBg, borderColor : theme.border, color : theme.text }]}
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
    marginBottom: 12,
    letterSpacing: 0.5,
    textAlign: "center"
  },
  headerRow: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
     marginBottom: 2
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6E6680",
    marginRight: 8
  },
  togglesContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
})