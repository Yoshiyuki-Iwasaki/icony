import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../util/date";

const OrderList = ({ orders, getTasks}:any) => {
    useEffect(() => {
        getTasks();
    }, []);
    const handleRemove = async (e: any, id: number) => {
        e.preventDefault();
        const result = window.confirm("本当にこの投稿を削除しますか。");
        if (result) {
            const { error }: any = await axios.delete(`/api/orders/${id}`);
            console.log("error", error);
            getTasks();
        }
    };

    return (
        <>
            <ul>
                {orders.map((order: any) => (
                    <ListItem key={order.id}>
                        <Block to={`/orders/${order.id}`}>
                            <LeftArea>
                                <Icon>
                                    <img src="" />
                                </Icon>
                                <Username>
                                    {order.requesting_user.name}
                                </Username>
                            </LeftArea>
                            <RightArea>
                                <Date> {formatDate(order.created_at)}</Date>
                                <Text>{order.content}</Text>
                                <RemoveText
                                    onClick={(e) => handleRemove(e, order.id)}
                                >
                                    削除
                                </RemoveText>
                            </RightArea>
                        </Block>
                    </ListItem>
                ))}
            </ul>
        </>
    );
}

export default OrderList;

const ListItem = styled.li`
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }
`;
const Block = styled(Link)`
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
const Username = styled.p`
    margin-top: 5px;
    font-size: 13px;
`;
const RightArea = styled.div`
    margin-left: 20px;
`;
const Date = styled.span`
    display: block;
    font-size: 13px;
`;
const Text = styled.span`
    margin-top: 10px;
    display: block;
    font-size: 14px;
`;
const RemoveText = styled.button`
    margin-top: 10px;
    font-size: 14px;
`;
