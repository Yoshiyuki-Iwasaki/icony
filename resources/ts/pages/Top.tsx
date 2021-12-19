import React, { useState } from "react";
import axios from "axios";
import OrderList from "../components/OrderList";
import Modal from "../components/Modal";

const Top = () => {
    const [orders, setOrders] = useState<any>([]);
    const getTasks = async () => {
        axios.get("/api/orders").then((res) => {
            setOrders(res.data);
            console.log("res.data", res.data);
        });
    };
    return (
        <>
            <OrderList orders={orders} getTasks={getTasks} />
            <Modal getTasks={getTasks} />
        </>
    );
};

export default Top;
