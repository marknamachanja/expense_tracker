import { View, Text, StyleSheet, TextInput, Button, Alert, Keyboard, TouchableOpacity } from "react-native";
import { useState }  from "react";

type AddExpenseFormProps = {
    onAddExpense: (description: string, amount: number) => void;
}

export default function AddExpenseForm({onAddExpense}: AddExpenseFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = () => {
        if(!description.trim()) {
            Alert.alert('Alert', 'Please enter a description');
            return;
        }

        const cost = parseFloat(amount);
        if(isNaN(cost) || cost <= 0) {
            Alert.alert('Alert', 'Please enter a valid amount');
            return;
        }

        //send data to parent component
        onAddExpense(description, cost);

        //clear the form
        setDescription("");
        setAmount("");

        Keyboard.dismiss();
    }

    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.input}
                placeholder = "Description"
                placeholderTextColor = "#0e0808"
                value = {description}
                onChangeText = {setDescription}
            />
            <TextInput
                style = {styles.input}
                placeholder = "Amount (KES)"
                placeholderTextColor = "#0e0808"
                value = {amount}
                onChangeText = { setAmount }   
                keyboardType = "numeric"               
            />
            <TouchableOpacity
                style ={ styles.button}
                onPress = { handleSubmit}
                activeOpacity = {0.8}
            >
                <Text style = {styles.buttonText}>
                    Add Expense
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    button: {
        backgroundColor: "#2D1B4E",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor : "#2D1B4E",
        shadowOffset :  { width: 0, height: 4 },
        shadowOpacity : 0.2,
        shadowRadius : 4,
        elevation : 4
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.6
    },
    input: {
        backgroundColor: "#F4F3F8",
        borderWidth: 1,
        borderColor: "#E2DFEC",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
        fontSize: 15,
        color: "#1F1235",
        fontWeight: "500"
    }
})