import { View, Text, StyleSheet } from "react-native";

export default function BalanceCard() {
    return (
        <View style = {styles.container}>
            <Text>
                Balance: Ksh.0.0
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        padding:20,
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        marginBottom: 20
    }
})