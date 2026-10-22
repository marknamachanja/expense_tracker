import {View, Text, StyleSheet, Button} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditExpenseScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                Edit Expense
            </Text>
            <Text style = {styles.subtitle}>
                Editing ID: { id }
            </Text>

            {/*Placeholder back button */}
            <Button 
                title = "Go Back"
                onPress = {() => router.back()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20
    }
})