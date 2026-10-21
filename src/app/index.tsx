import { View, StyleSheet } from "react-native";
import BalanceCard from "../components/BalanceCard";
import ExpenseRow from "../components/ExpenseRow";
import AddExpenseForm from "../components/AddExpenseForm";

export default function App() {
  return (
    <View style = {styles.container}>
      <BalanceCard />
      <ExpenseRow />
      <AddExpenseForm />
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  }
})