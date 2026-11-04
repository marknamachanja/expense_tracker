import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useExpenseStore } from "../../store/expenseStore";

export default function TabLayout() {
    const { isDarkMode } = useExpenseStore();

    const theme = isDarkMode ? {
        background : "#120A21",
        activeTint : "#FAFAFA",
        inactiveTint : "#6E6680",
        border : "#392659"
    } : {
        background : "#FFFFFF",
        activeTint : "#2D1B4E",
        inactiveTint : "#9A92A6",
        border : "#E2DFEC"
    }

    return (
            <Tabs
                screenOptions = {{
                    headerShown : false,
                    tabBarActiveTintColor : theme.activeTint,
                    tabBarInactiveTintColor : theme.inactiveTint,
                    tabBarStyle : {
                        backgroundColor : theme.background,
                        borderTopWidth : 1,
                        borderTopColor : theme.border,
                        paddingTop : 8,
                        height : 70,
                        elevation : 10,
                        shadowColor : "#2D1B4E",
                        shadowOffset : { width : 0, height : -4 },
                        shadowOpacity : 0.06,
                        shadowRadius : 12
                    },
                    tabBarLabelStyle :{
                        fontSize : 12,
                        fontWeight : "600",
                        marginTop : 2
                    }
                }}
            >
                <Tabs.Screen 
                    name = "index"
                    options = {{
                        title : "Expenses",
                        tabBarLabel : "Home",
                        tabBarIcon : ({ color, size}) => (
                            <Feather name = "home" size = {22} color = {color as string} />
                        ),
                    }}
                />

                <Tabs.Screen 
                    name = "analytics"
                    options = {{
                        title : "Analytics",
                        tabBarLabel : "Analytics",
                        tabBarIcon : ({ color, size }) => (
                            <Feather name = "bar-chart-2" size = {22} color = {color as string} />
                        ),
                    }}
                />
            </Tabs>
    );
}