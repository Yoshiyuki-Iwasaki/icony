import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../util/date";
import { OrderListType } from "../type/OrderList";

const OrderList: React.FC<OrderListType> = ({ user, orders, getOrders }) => {
    const [likes, setLikes] = useState<any>(null);

    useEffect(() => {
        getOrders();
        getLike();
    }, []);

    const handleRemove = async (e: any, id: number) => {
        e.preventDefault();
        const result = window.confirm("本当にこの投稿を削除しますか。");
        if (result) {
            const { error }: any = await axios.delete(`/api/orders/${id}`);
            console.log("error", error);
            getOrders();
        }
    };

    const getLike = () => {
        axios
            .get("/api/likes")
            .then((res) => {
                if (res.data) {
                    console.log("res", res);
                    setLikes(res.data);
                } else {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const insertLike = async (e: any, id: number) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/likes", {
            order_id: id,
            user_id: user.id,
        });
        console.log("error", error);
        getLike();
    };

    const removeLike = async (e: any, id: number) => {
        e.preventDefault();
        const likeFilter = likes.filter((like: any) => {
            return like.order_id.id === id && like.user_id.id === user.id;
        });
        const { error }: any = await axios.delete(
            `/api/likes/${likeFilter[0].id}`
        );
        console.log("error", error);
        getLike();
    };

    const likeFilterFunc = (id: number) => {
        const likeFilter = likes.filter((like: any) => {
            return like.order_id.id === id && like.user_id.id === user.id;
        });
        if (likeFilter.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    const likeCountFunc = (id: number) => {
        if (likes) {
            const customisedLiked = likes.filter((like: any) => {
                return like.order_id.id == id;
            });
            return customisedLiked.length;
        }
    };

    return (
        <>
            <List>
                {orders.map((order: any) => (
                    <ListItem key={order.id}>
                        <Block to={`/orders/${order.id}`}>
                            <LeftArea to={`/user/${order.requesting_user.id}`}>
                                <Icon>
                                    <img src="" />
                                </Icon>
                            </LeftArea>
                            <RightArea>
                                <RightAreaHeader>
                                    <Username>
                                        {order.requesting_user.name}
                                    </Username>
                                    <Date> {formatDate(order.created_at)}</Date>
                                </RightAreaHeader>
                                <Text>{order.content}</Text>
                                <RemoveText
                                    onClick={(e) => handleRemove(e, order.id)}
                                >
                                    削除
                                </RemoveText>
                            </RightArea>
                        </Block>
                        <BottomArea>
                            {likes && likeFilterFunc(order.id) ? (
                                <LikeButton
                                    onClick={(e) => removeLike(e, order.id)}
                                >
                                    いいね済み
                                </LikeButton>
                            ) : (
                                <LikeButton
                                    onClick={(e) => insertLike(e, order.id)}
                                >
                                    いいね
                                </LikeButton>
                            )}
                            <LikeCount>{likeCountFunc(order.id)}</LikeCount>
                        </BottomArea>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default OrderList;

const List = styled.ul`
    border-top: 1px solid #555;
    border-left: 1px solid #555;
    border-right: 1px solid #555;
`;
const ListItem = styled.li`
    position: relative;
    border-bottom: 1px solid #555;
`;
const Block = styled(Link)`
    margin-bottom: 15px;
    padding: 10px 10px 20px 10px;
    display: flex;
`;
const LeftArea = styled(Link)`
    text-align: center;
`;
const Icon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const RightArea = styled.div`
    margin-left: 20px;
`;
const RightAreaHeader = styled.div`
    display: flex;
    align-items: center;
`;
const Username = styled.p`
    font-size: 14px;
    font-weight: 700;
`;
const Date = styled.span`
    margin-left: 10px;
    display: block;
    font-size: 11px;
`;
const Text = styled.span`
    margin-top: 10px;
    display: block;
    font-size: 14px;
`;
const RemoveText = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
`;
const BottomArea = styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 60px;
    z-index: 10;
`;
const LikeButton = styled.button`
    font-size: 12px;
`;
const LikeCount = styled.p`
    margin-left: 5px;
    font-size: 12px;
`;
