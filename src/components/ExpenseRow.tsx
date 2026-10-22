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
            <Text style = {styles.description}>
                {description}
            </Text>
            <Text style = {styles.amount}>
                KES { amount.toFixed(2) }
            </Text>

            <TouchableOpacity 
                onPress = {() => router.push(`/edit/[id]`)}
                style = {styles.editButton}
            >
                <Text style = {styles.buttonText}>
                    Edit
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => onDelete(id)} style = {styles.deleteButton}>
                <Text style = { styles.deleteText}>
                    X
                </Text>
            </TouchableOpacity>
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
    textGroup:{
        flex:1,
    },
    description: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color:"#333"
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        paddingHorizontal : 12,
        paddingVertical: 8,
        borderRadius:6,
        marginLeft:10
    },
    deleteText: {
        color: '#fff',
        fontWeight: "bold"
    },
    editButton:{
        backgroundColor: "#4510d6",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 10
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
})