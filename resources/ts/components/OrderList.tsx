import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../util/date";

const OrderList = () => {
    const [orders, setOrders] = useState<any>([]);
    const [content, setContent] = useState<string>('');
    const getTasks = async () => {
        axios.get("/api/orders").then(res => {
            setOrders(res.data);
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
    useEffect(() => {
        getTasks();
    }, []);

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
                        <Link to={`/orders/${order.id}`}>
                            <Date> {formatDate(order.created_at)}</Date>
                            <Text>{order.content}</Text>
                            <button onClick={e => handleRemove(e, order.id)}>
                                削除
                            </button>
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
