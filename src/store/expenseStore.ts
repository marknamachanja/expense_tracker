import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Expense = {
    id: string;
    description: string;
    amount: number;
    date?: string;
    receiptUri?: string;
}

interface ExpenseState {
    expenses: Expense[];
    balance: number;
    loadData: () => Promise<void>;
    addExpense: (description: string, amount: number, receiptUri?: string) => void;
    deleteExpense: (id: string, amount: number) => void;
    updateExpense: (id: string, description: string, amount: number, receiptUri?: string) => void;
    isUSD: boolean;
    toggleCurrency: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const saveData = async ( expenses: Expense[], balance: number ) => {
    try {
        await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
        await AsyncStorage.setItem("balance", JSON.stringify(balance));
    } catch ( error ) {
        console.error("Failed to save data", error );
    }
};

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    balance: 5000,
    isUSD: false,
    isDarkMode: false,

    loadData: async () => {
        try {
            const savedExpenses = await AsyncStorage.getItem("expenses");
            const savedBalance = await AsyncStorage.getItem("balance");
            const savedTheme = await AsyncStorage.getItem("isDarkMode");
            const savedCurrency = await AsyncStorage.getItem("isUSD");

            set ({
                expenses:savedExpenses ? JSON.parse(savedExpenses) : [],
                balance: savedBalance ? JSON.parse(savedBalance) : 5000,
                isUSD: savedCurrency ? JSON.parse(savedCurrency) : false,
                isDarkMode: savedTheme ? JSON.parse(savedTheme) :false
            });
        } catch ( error ) {
            console.error("Failed to load data", error);
        }
    },

    addExpense: (description, amount, receiptUri) => {
        set(( state ) => {
            const newExpense = {
                id: Math.random().toString(),
                description,
                amount,
                date: new Date().toISOString(),
                receiptUri
            };

            const newExpenses = [ newExpense, ...state.expenses ];
            const newBalance = state.balance - amount;

            saveData( newExpenses, newBalance );

            return { expenses: newExpenses, balance: newBalance };
        })
    },

    deleteExpense: (id, amount ) => {
        set(( state ) => {
            const newExpenses = state.expenses.filter((e) => e.id !== id);
            const newBalance = state.balance + amount;

            saveData ( newExpenses, newBalance );

            return { expenses: newExpenses, balance: newBalance };
        });
    },

    updateExpense: (id, newDescription, newAmount, newReceiptUri) => {
        set(( state ) => {
            const expenseToEdit = state.expenses.find((e) => e.id === id);
            if (!expenseToEdit) {
                return state;
            }

            const newBalance = state.balance + expenseToEdit.amount - newAmount;

            const newExpenses = state.expenses.map((expense) => 
                expense.id === id
                ? { 
                    ...expense, 
                    description: newDescription, 
                    amount: newAmount,
                    receiptUri: newReceiptUri !== undefined ? newReceiptUri :  expense.receiptUri 
                }
                : expense
            );

            saveData(newExpenses, newBalance);
            return { expenses: newExpenses, balance: newBalance };
        })
    },

    toggleCurrency: () => {
        set((state) => {
            const newIsUSD = !state.isUSD;
            AsyncStorage.setItem("isUSD", JSON.stringify(newIsUSD));
            return { isUSD: newIsUSD };
        })
    },

    toggleDarkMode: () => {
        set((state) => {
            const newIsDarkMode = !state.isDarkMode;
            AsyncStorage.setItem("isDarkMode", JSON.stringify(newIsDarkMode));
            return { isDarkMode: newIsDarkMode };
        })
    }
}));