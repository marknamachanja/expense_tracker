import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions = {{
                headerShown : false,
                tabBarActiveTintColor : "#2D1B4E",
                tabBarInactiveTintColor : "#9A92A6",
                tabBarStyle : {
                    backgroundColor : '#FFFFFF',
                    borderTopWidth : 1,
                    borderTopColor : "#E2DFEC",
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