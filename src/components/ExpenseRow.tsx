import { View, Text, StyleSheet } from "react-native";

type ExpenseRowProps = {
    description: string;
    amount: number;
}

export default function ExpenseRow({description, amount }: ExpenseRowProps) {
    return (
        <View style = {styles.container}>
            <Text style = {styles.description}>
                {description}
            </Text>
            <Text style = {styles.amount}>
                KES { amount.toFixed(2) }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    description: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color:"#333"
    }
})