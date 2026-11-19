import { View, Text, StyleSheet, TextInput, Button, Alert, Keyboard, TouchableOpacity, Image } from "react-native";
import { useState }  from "react";
import { useExpenseStore } from "../store/expenseStore";
import { useExchangeRate } from "../hooks/useExchangeRate";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

type AddExpenseFormProps = {
    onAddExpense: (description: string, amount: number, receiptUri?: string) => void;
}

export default function AddExpenseForm({onAddExpense}: AddExpenseFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [receiptUri, setReceiptUri] = useState<string | null>(null);

    const { isUSD, isDarkMode } = useExpenseStore();
    const { data: exchangeRate } = useExchangeRate();

    //function to open the phone camera
    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if(!permissionResult.granted) {
            Alert.alert(
                "Permission Denied",
                "Camera access is required to take a photo."
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes:['images'],
            allowsEditing: true,
            quality: 0.7
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setReceiptUri(result.assets[0].uri);
        }
    }

    //function to pick an existing photo
    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult.granted) {
            Alert.alert(
                "Permission Denied",
                "Gallery access is required to select a photo."
            )
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync ({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.7
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setReceiptUri(result.assets[0].uri);
        }
    }

    const handleSubmit = () => {
        if(!description.trim()) {
            Alert.alert('Alert', 'Please enter a description');
            return;
        }

        let cost = parseFloat(amount);
        if(isNaN(cost) || cost <= 0) {
            Alert.alert('Alert', 'Please enter a valid amount');
            return;
        }

        if ( isUSD && exchangeRate ) {
            cost = cost * exchangeRate;
        }

        //send data to parent component
        onAddExpense(description, cost, receiptUri || undefined);

        //clear the form
        setDescription("");
        setAmount("");
        setReceiptUri(null);

        Keyboard.dismiss();
    }

    const theme = isDarkMode ? {
        inputBg : "#1F1235",
        border : "#392659",
        text : "#FAFAFA",
        placeholder : "#A39BB5",
        buttonBg : "#4510D6"
    } : {
        inputBg : "#F4F3F8",
        border : "#E2DFEC",
        text : "#1F1235",
        placeholder : "#9A92A6",
        buttonBg : "#2D1B4E"
    }

    return (
        <View style = {styles.container}>
            <TextInput
                style = {[styles.input, { backgroundColor : theme.inputBg, borderColor : theme.border, color : theme.text}]}
                placeholder = "Description"
                placeholderTextColor = {theme.placeholder}
                value = {description}
                onChangeText = {setDescription}
            />
            <TextInput
                style = {[styles.input, { backgroundColor : theme.inputBg, borderColor : theme.border, color : theme.text }]}
                placeholder = { isUSD ? "Amount(USD)" : "Amount(KES)"}
                placeholderTextColor = { theme.placeholder }
                value = {amount}
                onChangeText = { setAmount }   
                keyboardType = "numeric"               
            />

            {/* Camera and gallery buttons */}
            <View style = {styles.photoActionsRow}>
                <TouchableOpacity
                    style = {[styles.photoButton, {borderColor :theme.border, backgroundColor : theme.inputBg}]}
                    onPress = { handleTakePhoto }
                    activeOpacity = {0.7}
                >
                    <Feather name="camera" size = {18} color = {theme.text} />
                    <Text style = {[styles.photoButtonText, { color : theme.text }]}>
                        Camera
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {[styles.photoButton, {borderColor :theme.border, backgroundColor : theme.inputBg}]}
                    onPress = { handlePickImage }
                    activeOpacity = {0.7}
                >
                    <Feather name="image" size = {18} color = {theme.text} />
                    <Text style = {[styles.photoButtonText, { color : theme.text }]}>
                        Gallery
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Preview of the chosen photo */}
            { receiptUri && (
                <View style = {styles.previewContainer}>
                    <Image source = {{ uri: receiptUri }} style = {styles.previewImage} />
                    <TouchableOpacity
                        style= {styles.removePhotoButton}
                        onPress = {() => setReceiptUri(null)}
                    >
                        <Text 
                            style = {styles.removePhotoText}    
                        >
                            X
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity
                style ={ [styles.button, { backgroundColor : theme.buttonBg }]}
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
    }, 
    photoActionsRow: {
        flexDirection: "row",
        marginBottom: 12,
        gap: 10
    },
    photoButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical:12,
        borderRadius: 12,
        borderWidth: 1
    },
    photoButtonText: {
        fontSize: 14,
        fontWeight: "600"
    },
    previewContainer: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between",
        marginBottom: 12,
        padding: 8,
        borderRadius: 14,
        backgroundColor: "rgba(0,0,0,0.03)"
    },
    previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    },
    removePhotoButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#FEECEB",
    },
    removePhotoText: {
        color: "#E53935",
        fontWeight: "700",
        fontSize: 13,
    },
})