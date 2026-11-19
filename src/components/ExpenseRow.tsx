import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { useRouter } from "expo-router";
import { useExpenseStore } from "../store/expenseStore";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { Feather } from "@expo/vector-icons";

type ExpenseRowProps = {
    id: string;
    description: string;
    amount: number;
    receiptUri?: string;
    onDelete: (id: string) => void;
}

export default function ExpenseRow({id, description, amount, onDelete, receiptUri}: ExpenseRowProps) {
    const router = useRouter();

    const { isUSD, isDarkMode } = useExpenseStore();
    const { data: exchangeRate } = useExchangeRate();
    const [ isModalVisible, setIsModalVisible ] = useState(false);

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

            {/* Show receipt image if available */}
            { receiptUri && (
                <TouchableOpacity onPress = {() => setIsModalVisible(true)}>
                    <Image source = {{ uri: receiptUri }} style = {styles.receiptThumbnail} />
                </TouchableOpacity>
            )}

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

            {/* Modal for displaying the receipt image */}
            <Modal
                visible = {isModalVisible}
                transparent = {true}
                animationType = "fade"
                onRequestClose = {() => setIsModalVisible(false)}
            >
                <View style = {styles.modalBackdrop}>
                    <View style = {styles.modalContent}>
                        {receiptUri && (
                            <Image 
                                source = {{ uri: receiptUri }}
                                style = {styles.modalImage}
                                resizeMode = "contain"
                            />
                        )}
                        <TouchableOpacity
                            style = { styles.closeModalButton }
                            onPress = {() => setIsModalVisible(false)}
                        >
                            <Text style = {styles.closeModalText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    receiptThumbnailContainer: {
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2DFEC",
    },
    receiptThumbnail: {
        width: 42,
        height: 42,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        width: "100%",
        height: "90%",
        borderRadius: 16,
    },
    closeModalButton: {
        marginTop: 20,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    closeModalText: {
        color: "#1F1235",
        fontWeight: "700",
        fontSize: 16,
    },
})