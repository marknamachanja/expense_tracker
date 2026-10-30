import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type ExpenseRowProps = {
    id: string;
    description: string;
    amount: number;
    onDelete: (id: string) => void;
}

export default function ExpenseRow({id, description, amount, onDelete}: ExpenseRowProps) {
    const router = useRouter();

    return (
        <View style = {styles.container}>
            <View style = {styles.textGroup}>
                <Text style = {styles.description}>
                    {description}
                </Text>
                <Text style = {styles.amount}>
                    KES { amount.toFixed(2) }
                </Text>
            </View>

            <View style = {styles.buttonGroup}>
                <TouchableOpacity 
                    onPress = {() => router.push(`/edit/${id}`)}
                    style = {styles.editButton}
                >
                    <Text style = {styles.editButtonText}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress ={() => onDelete(id)} style = {styles.deleteButton}>
                    <Text style = { styles.deleteText}>
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