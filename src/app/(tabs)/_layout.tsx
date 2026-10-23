import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name = "index"
                options = {{
                    title : "Expenses",
                    tabBarLabel : "Home",
                    headerShown : false
                }}
            />

            <Tabs.Screen 
                name = "analytics"
                options = {{
                    title : "Analytics",
                    tabBarLabel : "Analytics"
                }}
            />
        </Tabs>
    );
}