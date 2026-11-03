import { useQuery } from "@tanstack/react-query";

export function useExchangeRate() {
    return useQuery({
        queryKey:[ 'currency-kes'],
        queryFn: async () => {
            const response = await fetch("https://open.er-api.com/v6/latest/USD");
            if (!response.ok) throw new Error("Network response was not ok");
            const json = await response.json();
            return json.rates.KES;
        },
        staleTime: 1000 * 60 * 60,
    })
}