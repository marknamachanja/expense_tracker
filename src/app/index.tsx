import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState } from "react";
import BalanceCard from "../components/BalanceCard";
import ExpenseRow from "../components/ExpenseRow";
import AddExpenseForm from "../components/AddExpenseForm";

type Expense = {
  id : string;
  description: string;
  amount: number;
}

export default function App() {

  const [balance, setBalance ] = useState<number>(5000);

  //state to hold array of expenses
  const [expenses, setExpenses ] = useState<Expense[]>([]);

  //receive data from AddExpenseForm
  const handleAddExpense = (description: string, amount: number) => {
    setBalance( currentBalance => currentBalance - amount);

    //new expense object with unique id
    const newExpense: Expense = {
      id: Math.random().toString(),
      description: description,
      amount: amount
    }

    //keep old expenses, add new ones to the top
    setExpenses( currentExpenses => [newExpense, ...currentExpenses]);
  }

  

  return (
    <View style = {styles.container}>
      <BalanceCard balance = {balance} />
      <AddExpenseForm onAddExpense = {handleAddExpense} />
      <Text style = {styles.subtitle}>
        Recent Expenses
      </Text>

      <ScrollView style = {styles.listContainer}>
        {expenses.map(expense => (
          <ExpenseRow 
            key={expense.id}
            description = {expense.description}
            amount = {expense.amount}
          />
        ))}
      </ScrollView>
    </View>
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
  }
})