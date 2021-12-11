import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
    const { id }: any = useParams();
    const [orders, setOrders] = useState<any>([]);

    const getTasks = async () => {
        axios.get(`/api/orders/${id}`).then((res) => {
            setOrders(res.data);
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            OrderDetail
            {orders && orders.content}
            {orders && orders.created_at}
        </div>
    );
}

export default OrderDetail;
