import axios from "axios";
import { useQuery } from "react-query";

const getLike = () => {
    return useQuery("orders", async () => {
        const { data } = await axios.get("/api/likes");
        return data;
    });
};

export { getLike };
