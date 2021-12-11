import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

    return (
        <>
            <Link to="/about">About</Link>
            <ul>
                {orders.map((order: any) => (
                    <ListItem key={order.id}>
                        <Link to={`/orders/${order.id}`}>
                            <Date> {order.created_at}</Date>
                            <Text>{order.content}</Text>
                        </Link>
                    </ListItem>
                ))}
            </ul>
        </>
    );
}

export default OrderList;

const ListItem = styled.li`
    margin-top: 10px;

    &:first-child {
        margin-top: 0;
    }
`;
const Date = styled.span`
    font-size: 13px;
`;
const Text = styled.span`
    font-size: 14px;
`;
