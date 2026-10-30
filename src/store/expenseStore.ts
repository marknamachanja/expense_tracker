import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Expense = {
    id: string;
    description: string;
    amount: number;
    date?: string;
}

interface ExpenseState {
    expenses: Expense[];
    balance: number;
    loadData: () => Promise<void>;
    addExpense: (description: string, amount: number) => void;
    deleteExpense: (id: string, amount: number) => void;
    updateExpense: (id: string, description: string, amount: number) => void;
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

    loadData: async () => {
        try {
            const savedExpenses = await AsyncStorage.getItem("expenses");
            const savedBalance = await AsyncStorage.getItem("balance");

            set ({
                expenses:savedExpenses ? JSON.parse(savedExpenses) : [],
                balance: savedBalance ? JSON.parse(savedBalance) : 5000,
            });
        } catch ( error ) {
            console.error("Failed to load data", error);
        }
    },

    addExpense: (description, amount) => {
        set(( state ) => {
            const newExpense = {
                id: Math.random().toString(),
                description,
                amount,
                date: new Date().toISOString(),
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

    updateExpense: (id, newDescription, newAmount) => {
        set(( state ) => {
            const expenseToEdit = state.expenses.find((e) => e.id === id);
            if (!expenseToEdit) {
                return state;
            }

            const newBalance = state.balance + expenseToEdit.amount - newAmount;

            const newExpenses = state.expenses.map((expense) => 
                expense.id === id
                ? { ...expense, description: newDescription, amount: newAmount }
                : expense
            );

            saveData(newExpenses, newBalance);
            return { expenses: newExpenses, balance: newBalance };
        })
    }
}));