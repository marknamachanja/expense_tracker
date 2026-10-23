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
        padding:30,
        backgroundColor: "#2D1B4E",
        borderRadius: 20,
        marginBottom: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor : "#2D1B4E",
        shadowOffset : { width: 0, height: 5},
        shadowOpacity : 0.44,
        shadowRadius : 6,
        elevation : 8
        },
    label: {
        color: "#FFFFFFB2",
        fontSize: 14,
        textTransform: "uppercase",
        marginBottom: 5,
        letterSpacing: 1.5,
        fontWeight: "600"
    },
    amount: {
        color:"#ffffff",
        fontSize:38,
        fontWeight: "800",
        letterSpacing: 0.8
    }
})