import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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
            {orders && <Date>{orders.created_at}</Date>}
            {orders && <Text>{orders.content}</Text>}
        </div>
    );
}

export default OrderDetail;

const Date = styled.p`
    font-size: 13px;
`;
const Text = styled.p`
    font-size: 14px;
`;
