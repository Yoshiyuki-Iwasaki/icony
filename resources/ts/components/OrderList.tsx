import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const getTasks = async () => {
        axios.get("/api/orders").then(res => {
            setOrders(res.data);
        });
    }
    useEffect(() => {
        getTasks();
    }, []);
    console.log("orders", orders);
    return (
        <>
            <Link to="/about">About</Link>
            <ul>
                {orders.map((order: any) => (
                    <li key={order.id}>
                        <Link to={`/orders/${order.id}`}>
                            <span> {order.created_at}</span>
                            <span>{order.content}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default OrderList;

if (document.getElementById('orderList')) {
    ReactDOM.render(<OrderList />, document.getElementById("orderList"));
}
