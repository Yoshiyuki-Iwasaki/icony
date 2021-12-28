import React, { useState } from "react";
import axios from "axios";
import OrderList from "../components/OrderList";
import Modal from "../components/Modal";
import { TopType } from "../type/Top";

const Top: React.FC<TopType> = ({ user }) => {
    const [orders, setOrders] = useState<any>([]);
    const getOrders = async () => {
        axios.get("/api/orders").then((res) => {
            setOrders(res.data);
            console.log("res.data", res.data);
        });
    };
    return (
        <>
            <OrderList user={user} orders={orders} getOrders={getOrders} />
            <Modal user={user} getOrders={getOrders} />
        </>
    );
};

export default Top;
