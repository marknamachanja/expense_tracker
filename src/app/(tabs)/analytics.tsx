import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { useExpenseStore } from "../../store/expenseStore";
import { useExchangeRate } from "../../hooks/useExchangeRate";
import { BarChart } from "react-native-chart-kit";
import { useQuery } from "@tanstack/react-query";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen() {
    const { expenses, isUSD } = useExpenseStore();
    const { data:exchangeRate, isLoading, isError } = useExchangeRate();

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageSpent = expenses.length > 0? totalSpent / expenses.length : 0;
    const highestExpense = expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;

    const topExpenses = [ ...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    const formatMoney = ( amountInKES: number ) => {
        if ( isUSD && exchangeRate ) {
            return `$ ${(amountInKES / exchangeRate ).toFixed(2)}`;
        }
        return `KES ${amountInKES.toFixed(2)}`;
    }

    //monthly math
    const currentMonthLabel = new Date().toLocaleString('default', { month: 'short' });

    const monthlyData = expenses.reduce((buckets, expense ) => {
        const month = expense.date
            ? new Date(expense.date).toLocaleString('default', { month: 'short' })
            :currentMonthLabel;
        
        if (!buckets[month]) {
            buckets[month] = 0;
        }

        buckets[month] += expense.amount;

        return buckets;
    }, {} as Record< string, number>);

    //split the array into labels and data
    const chartLabels = Object.keys(monthlyData);
    const chartValues = Object.values(monthlyData).map(val => {
        if ( isUSD && exchangeRate ) {
            return Number((val / exchangeRate).toFixed(2));
        }
        return val;
    }
    );

    //dummy data if no values
    if (chartLabels.length === 0) {
        chartLabels.push(currentMonthLabel);
        chartValues.push(0)
    }

    return (
        <ScrollView 
            style = { styles.container }
            contentContainerStyle = { styles.content}
        >
            <Text
                style = {styles.pageTitle}
            >
                Analytics
            </Text>
            <View
                style = { styles.mainCard}
            >
                <Text
                    style = { styles.mainLabel }
                >
                    Total Spent
                </Text>
                {isUSD && isLoading ? (
                    <ActivityIndicator
                        size = "small"
                        color = "#FFFFFF"
                        style = {{ marginVertical: 10 }}
                    />
                ) : (
                    <Text
                        style = { styles.mainAmount }
                    >
                        {formatMoney(totalSpent)}
                    </Text>
                )}
                <Text
                    style = { styles.subText }
                >
                    { expenses.length } total transactions
                </Text>
                { isUSD && isError && (
                    <Text>
                        Could not fetch live exchange rates
                    </Text>
                )}
            </View>

            {/*Monthly Bar Chart */}
            <View
                style = { styles.chartContainer }
            >
                <Text
                    style = { styles.sectionTitle }
                >
                    Monthly Spending
                </Text>
                <BarChart 
                    data = {{
                        labels: chartLabels,
                        datasets: [
                            {
                                data: chartValues
                            }
                        ]
                    }}
                    width = { screenWidth - 48 }
                    height = { 240 }
                    yAxisLabel = { isUSD ? "$" : "KES" }
                    yAxisSuffix = ""
                    fromZero = { true }
                    chartConfig ={{
                        backgroundColor: "#FFFFFF",
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientTo: "#FFFFFF",
                        decimalPlaces: 0,
                        color: () => "#4510D6",
                        labelColor: () => "#6E6680",
                        style: { borderRadius : 16},
                        barPercentage: 0.6,
                        propsForLabels: {
                            fontSize: 10
                        }
                    }}
                    style = { styles.chart}
                    showValuesOnTopOfBars = { true }
                    segments = { 4 }
                />
            </View>

            <View
                style = { styles.statsRow}
            >
                <View
                    style = { styles.smallCard}
                >
                    <Text
                        style = { styles.smallLabel}
                    >
                        Average
                    </Text>
                    <Text
                        style = { styles.smallAmount }
                    >
                        {formatMoney(averageSpent)}
                    </Text>
                </View>

                <View
                    style = { styles.smallCard}
                >
                    <Text
                        style = { styles.smallLabel}
                    >
                        Highest
                    </Text>
                    <Text
                        style = { styles.smallAmount }
                    >
                        {formatMoney(highestExpense)}
                    </Text>
                </View>
            </View>

            <View >
                <Text 
                    style = { styles.sectionTitle }
                >
                    Biggest Expense
                </Text>

                { topExpenses.length > 0 ? (
                    topExpenses.map ((expense, index) => (
                        <View
                            key = { expense.id }
                            style = { styles.topExpenseRow }
                        >
                            <View
                                style = { styles.rankBadge }
                            >
                                <Text
                                    style = { styles.rankText }
                                >
                                    { index + 1 }
                                </Text>
                            </View>
                            <Text
                                style = { styles.expenseDesc }
                                numberOfLines = { 1 }
                            >
                                { expense.description }
                            </Text>
                            <Text
                                style = { styles.expenseAmount }
                            >
                                { formatMoney(expense.amount )}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text
                        style = { styles.emptyText }
                    >
                        No expenses yet
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFC"
    },
    content: {
        padding: 24,
        paddingTop: 60,
        paddingBottom: 100,    
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: "900",
        color: "#2D1B4E",
        marginBottom: 24,
        letterSpacing: 0.5
    },
    mainCard: {
        backgroundColor: "#2D1B4E",
        padding: 24,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#2D1B4E",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8
    },
    mainLabel: {
        color: "#FAFAFA",
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 8,
        fontWeight: "600"
    },
    mainAmount: {
        color: "#FFFFFF",
        fontSize: 38,
        fontWeight: "800",
        letterSpacing: -0.5,
        marginBottom: 8
    },
    subText: {
        color: "#FAFAFA",
        fontSize: 13,
        fontWeight: "500"
    },
    chartContainer: {
        marginBottom: 24
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2DFEC",
        overflow: "hidden"
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32
    },
    smallCard: {
        flex: 1,
        backgroundColor: "#F4F3F8",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2DFEC",
        marginHorizontal: 4,
    },
    smallLabel: {
        color: "#6E6680",
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing : 1,
        marginBottom: 6,
        fontWeight: "600"
    },
    smallAmount: {
        color: "#1F1235",
        fontSize: 22,
        fontWeight: "800",
    },
    section: {
        marginBottom: 8
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#2D1B4E",
        marginBottom: 16
    },
    topExpenseRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth : 1,
        borderColor: "#E2DFEC"
    },
    rankBadge: {
        backgroundColor : "#F0EDF6",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12
    },
    rankText: {
        color: "#2D1B4E",
        fontWeight: "800",
        fontSize: 14
    },
    expenseDesc: {
        flex: 1,
        fontSize: 16,
        color: "#1F1235",
        fontWeight: "600",
        paddingRight: 10,
    },
    expenseAmount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#E53935"
    },
    emptyText: {
        color: "#9A92A6",
        fontSize: 16,
        fontStyle: "italic"
    },
    currencyCard: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        marginBottom : 24,
        borderWidth: 1,
        borderColor: "#E2DFEC"
    },
    currencyTitle: {
        color: '#6E6680',
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 1,
        fontWeight: "600",
        marginBottom: 8
    },
    usdAmount: {
        color: "#2D1B4E",
        fontSize: 28,
        fontWeight: "800"
    },
    rateText: {
        color: "#9A92A6",
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500"
    },
    errorText: {
        color: "#E53935",
        fontSize:14,
        fontWeight: "600",
        marginTop: 8
    }
})