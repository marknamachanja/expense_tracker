import { View, Text, StyleSheet } from "react-native";

//define type
type BalanceCardProps = {
    balance: number;
}

export default function BalanceCard({balance}: BalanceCardProps) {
    return (
        <View style = {styles.container}>
            <Text style = {styles.label}>
                Total Balance
            </Text>
            <Text style = {styles.amount}>
                KES {balance.toFixed(2)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        padding:20,
        backgroundColor: "#cab2af",
        borderRadius: 15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        color: "#480c5ae7",
        fontSize: 16,
        marginBottom: 5,
    },
    amount: {
        color:"#080808",
        fontSize:32,
        fontWeight: "bold"
    }
})