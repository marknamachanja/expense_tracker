import { View, Text, StyleSheet } from "react-native";

export default function ExpenseRow() {
    return (
        <View style = {styles.container}>
            <Text>
                Expense Row
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    }
})