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
        <>
            <Block>
                <LeftArea>
                    <Icon>
                        <img src="" />
                    </Icon>
                    <Username>{user && user.name}</Username>
                </LeftArea>
                <RightArea>
                    <Date> {formatDate(orders && orders.created_at)}</Date>
                    <Text>{orders && orders.content}</Text>
                </RightArea>
            </Block>
        </>
    );
}

export default OrderDetail;

const Block = styled.div`
    display: flex;
`;
const LeftArea = styled.div`
    text-align: center;
`;
const Icon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const Username = styled.div`
    margin-top: 5px;
    font-size: 13px;
`;
const RightArea = styled.div`
    margin-left: 20px;
`;
const Date = styled.p`
    font-size: 13px;
`;
const Text = styled.p`
    margin-top: 10px;
    font-size: 14px;
`;
