import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useState, useEffect } from "react";
import { useExpenseStore } from "../../store/expenseStore";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditExpenseScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { expenses, updateExpense } = useExpenseStore();

    const [description, setDescription ] = useState("");
    const [amount, setAmount ] = useState("");

    useEffect(() => {
        // wait for expo to finish loading the url
        if (!id) return;

        //force id to be a string
        const expenseId = Array.isArray(id) ? id[0] : id;

        const expense = expenses.find((e) => e.id === expenseId);

        if ( expense ) {
            setDescription(expense.description);
            setAmount(expense.amount.toString());
        } else {
            Alert.alert("Error", "Expense not found");
            router.back();
        }
    },[id, expenses]);

    const handleSave = () => {
        if ( !description.trim()) {
            Alert.alert("Required field", "Please enter a description");
            return;
        }

        const cost = parseFloat(amount);
        if ( isNaN(cost) || cost <= 0 ) {
            Alert.alert("Invalid amount", "Please enter a valid amount")
            return;
        }

        //send the data to zustand
        updateExpense(id as string, description.trim(), cost);

        router.back();
    }

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior={ Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset = { Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View 
                    style = { styles.inner}
                >
                    <Text
                        style = {styles.pageTitle}
                    >
                        Edit Expense
                    </Text>

                    <TextInput
                        style = { styles.input}
                        placeholder = "Description"
                        placeholderTextColor = "#9A92A6"
                        value = {description}
                        onChangeText = {setDescription}
                    />

                    <TextInput 
                        style = { styles.input}
                        placeholder = "Amount"
                        placeholderTextColor = "#9A92A6"
                        value = {amount}
                        onChangeText = { setAmount }
                        keyboardType = "decimal-pad"
                    />

                    <TouchableOpacity
                        style = { styles.button}
                        onPress = { handleSave}
                        activeOpacity = { 0.8 }
                    >
                        <Text
                            style = { styles.buttonText}
                        >
                            Save Changes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = { styles.cancelButton}
                        onPress = { () => router.back()}
                        activeOpacity = { 0.8}
                    >
                        <Text
                            style = { styles.cancelButtonText}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFC"
    },
    inner: {
        flex: 1,
        padding: 24,
        justifyContent: "center"
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: "900",
        color: "#2D1B4E",
        marginBottom: 32,
        textAlign: "center",
        letterSpacing: 0.5
    },
    input: {
        backgroundColor: "#F4F3F8",
        borderWidth: 1,
        borderColor: "#E2DFEC",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 16,
        fontSize: 16,
        color: "#1F1235",
        fontWeight: "500"
    },
    button: {
        backgroundColor: "#2D1B4E",
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        shadowColor: "#2D1B4E",
        shadowOffset: { width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5
    },
    cancelButton: {
        paddingVertical: 18,
        marginTop: 8,
        alignItems: "center"
    },
    cancelButtonText: {
        color: "#6E6680",
        fontSize: 16,
        fontWeight: "600",
    }
})