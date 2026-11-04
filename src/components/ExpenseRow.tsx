import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useExpenseStore } from "../store/expenseStore";
import { useExchangeRate } from "../hooks/useExchangeRate";

type ExpenseRowProps = {
    id: string;
    description: string;
    amount: number;
    onDelete: (id: string) => void;
}

export default function ExpenseRow({id, description, amount, onDelete}: ExpenseRowProps) {
    const router = useRouter();

    const { isUSD, isDarkMode } = useExpenseStore();
    const { data: exchangeRate } = useExchangeRate();

    const formatMoney = ( amountInKES: number ) => {
        if ( isUSD && exchangeRate ) {
            return `$ ${(amountInKES / exchangeRate ).toFixed(2)}`;
        }
        return `KES ${amountInKES.toFixed(2)}`;
    }
    
    const theme  = isDarkMode ? {
        textMain : "#FAFAFA",
        textSub : "#A39BB5",
        border : "#392659",
        editBg : "#392659",
        editText : "#FAFAFA",
        deleteBg : "#4A1525",
        deleteText : "#FF8A80"
    } : {
        textMain : "#1F1235",
        textSub : "#6E6680",
        border : "#E2DFEC",
        editBg : "#F0EDF6",
        editText : "#2D1B4E",
        deletebg : "#FEECEB",
        deleteText : "#E53935"
    }

    return (
        <View style = {[styles.container, { borderBottomColor : theme.border }]}>
            <View style = {styles.textGroup}>
                <Text style = {[styles.description, { color : theme.textMain }]}>
                    {description}
                </Text>
                <Text style = {[styles.amount, { color : theme.textSub }]}>
                    { formatMoney(amount)}
                </Text>
            </View>

            <View style = {styles.buttonGroup}>
                <TouchableOpacity 
                    onPress = {() => router.push(`/edit/${id}`)}
                    style = {[styles.editButton, { backgroundColor : theme.editBg }]}
                >
                    <Text style = {[styles.editButtonText, { color : theme.editText }]}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress ={() => onDelete(id)} style = {[styles.deleteButton, { backgroundColor : theme.deleteBg}]}>
                    <Text style = { [styles.deleteText, { color : theme.deleteText }]}>
                        ✕
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E2DFEC",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textGroup:{
        flex:1,
        paddingRight: 10
    },
    description: {
        fontSize: 16,
        color: "#1F1235",
        fontWeight: "600",
        marginBottom: 4
    },
    amount: {
        fontSize: 14,
        fontWeight: "500",
        color:"#6E6680"
    },
    deleteButton: {
        backgroundColor: "#FEECEB",
        paddingHorizontal : 12,
        paddingVertical: 8,
        borderRadius:20,
    },
    deleteText: {
        color: '#E53935',
        fontWeight: "900",
        fontSize: 14
    },
    editButton:{
        backgroundColor: "#F0EDF6",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
        marginRight: 8
    },
    editButtonText: {
        color: "#2D1B4E",
        fontWeight: "700",
        fontSize: 13
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    buttonGroup: {
        flexDirection: "row",
        alignItems: "center"
    }
})