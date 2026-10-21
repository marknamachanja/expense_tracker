import { View, Text, StyleSheet } from "react-native";

export default function AddExpenseForm() {
    return (
        <View style = {styles.container}>
            <Text>
                Add Expense Form
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop:20
    }
})