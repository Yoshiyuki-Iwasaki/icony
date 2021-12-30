import axios from "axios";
import { useQuery } from "react-query";

const getLike = () => {
    return useQuery("orders", async () => {
        const { data } = await axios.get("/api/follows");
        return data;
    });
};

export { getLike };
