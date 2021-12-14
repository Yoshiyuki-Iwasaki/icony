import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../util/date";

const OrderList = () => {
    const [orders, setOrders] = useState<any>([]);
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        getTasks();
    }, []);
    const getTasks = async () => {
        axios.get("/api/orders").then(res => {
            setOrders(res.data);
            console.log("res.data", res.data);
        });
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/orders", {
            requested_user_id: 2,
            requesting_user_id: 9,
            content: content,
            category_id: 15,
            talkroom_id: 0,
        });
        console.log('error', error);
        setContent('');
        getTasks();
    }
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Todoを入力してください。"
                    onChange={(e) => setContent(e.target.value)}
                />
            </form>
            <ul>
                {orders.map((order: any) => (
                    <ListItem key={order.id}>
                        <Block to={`/orders/${order.id}`}>
                            <Username>{order.requesting_user.name}</Username>
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
    margin-top: 10px;

    &:first-child {
        margin-top: 0;
    }
`;
const Block = styled(Link)`
    display: flex;
`;
const Username = styled.p`
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
    margin-top: 5px;
    display: block;
    font-size: 14px;
`;
const RemoveText = styled.button`
    font-size: 14px;
`;
