import axios from "axios";
import { useQuery } from "react-query";

const getOrders = () => {
    return useQuery("orders", async () => {
        const { data } = await axios.get("/api/orders");
        return data
    });
};


export { getOrders };
