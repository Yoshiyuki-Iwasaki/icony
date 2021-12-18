import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { formatDate } from "../util/date";
import { Link } from "react-router-dom";

const OrderDetail = () => {
    const { id }: any = useParams();
    const [orders, setOrders] = useState<any>([]);
    const [user, setUser] = useState<any>()

    const getTasks = async () => {
        axios.get(`/api/orders/${id}`).then((res) => {
            setOrders(res.data);
            setUser(res.data.requesting_user);
            console.log("res.data01", res.data);
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            {user && <Username to={`/user/${user.id}`}>{user.name}</Username>}
            {orders && <Date>{formatDate(orders.created_at)}</Date>}
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
const Username = styled(Link)`
    font-size: 13px;
`;
