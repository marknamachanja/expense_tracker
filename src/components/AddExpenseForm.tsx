import { View, Text, StyleSheet, TextInput, Button, Alert, Keyboard } from "react-native";
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
                placeholder = "What did you buy?"
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
            />
            <Button
                title = "Add Expense"
                onPress = {handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop:20
    },
    input: {
        backgroundColor: "#cab2af",
        borderWidth: 1,
        color: "#000",
        borderColor: "#ccc",
        borderRadius: 8,
        padding : 12,
        marginBottom: 10,
        fontSize: 16
    }
})