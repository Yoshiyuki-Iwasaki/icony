import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { formatDate } from "../util/date";
import { Link } from "react-router-dom";
import { OrderDetailType } from "../type/OrderDetail";

const OrderDetail: React.FC<OrderDetailType> = ({ user }) => {
    const { id }: any = useParams();
    const [orders, setOrders] = useState<any>([]);
    const [requestUser, setRequestUser] = useState<any>();
    const [comments, setComments] = useState<any>([]);
    const [content, setContent] = useState<string>();

    useEffect(() => {
        getOrder();
        getComment();
    }, []);

    const getOrder = async () => {
        axios.get(`/api/orders/${id}`).then((res) => {
            setOrders(res.data);
            setRequestUser(res.data.requesting_user);
            console.log("res.data01", res.data);
        });
    };

    const getComment = async () => {
        axios.get(`/api/comments`).then((res) => {
            setComments(res.data);
            console.log("comment", res.data);
        });
    };

    const insertComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/comments", {
            content: content,
            order_id: id,
            user_id: user.id,
        });
        console.log("error", error);
        setContent("");
        getComment();
    };

    const RemoveComment = async (e: any, id: number) => {
        e.preventDefault();
        const result = window.confirm("本当にこの投稿を削除しますか。");
        if (result) {
            const { error }: any = await axios.delete(`/api/comments/${id}`);
            console.log("error", error);
            getComment();
        }
    };

    return (
        <>
            <Block>
                <LeftArea to={`/user/${orders.requesting_user_id}`}>
                    <Icon>
                        <img src="" />
                    </Icon>
                </LeftArea>
                <RightArea>
                    <RightAreaHeader>
                        <Username>{requestUser && requestUser.name}</Username>
                        <Date> {formatDate(orders && orders.created_at)}</Date>
                    </RightAreaHeader>
                    <Text>{orders && orders.content}</Text>
                </RightArea>
            </Block>
            <CommentArea>
                <CommentTitle>コメント一覧</CommentTitle>
                <CommentList>
                    {comments.map(
                        (comment: any, index: number) =>
                            comment.order_id.id == id && (
                                <CommentListItem key={index}>
                                    <CommentLeftArea
                                        to={`/user/${comment.user_id.id}`}
                                    >
                                        <CommentIcon>
                                            <img src="" />
                                        </CommentIcon>
                                    </CommentLeftArea>
                                    <CommentRightArea>
                                        <CommentRightAreaHeader>
                                            <CommentUsername>
                                                {comment.user_id.name}
                                            </CommentUsername>
                                            <CommentDate>
                                                {formatDate(comment.created_at)}
                                            </CommentDate>
                                        </CommentRightAreaHeader>
                                        <CommentText>
                                            {comment.content}
                                        </CommentText>
                                        <CommentRemoveText
                                            onClick={(e) =>
                                                RemoveComment(e, comment.id)
                                            }
                                        >
                                            削除
                                        </CommentRemoveText>
                                    </CommentRightArea>
                                </CommentListItem>
                            )
                    )}
                </CommentList>
                <CommentTitle>コメント追加</CommentTitle>
                <CommentForm onSubmit={insertComment}>
                    <CommentInput
                        type="text"
                        placeholder="入力してください。"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </CommentForm>
            </CommentArea>
        </>
    );
};

export default OrderDetail;

const Block = styled.div`
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
const Username = styled.div`
    font-size: 14px;
    font-weight: 700;
`;
const Date = styled.p`
    margin-left: 10px;
    display: block;
    font-size: 11px;
`;
const Text = styled.p`
    margin-top: 10px;
    font-size: 14px;
`;
const CommentList = styled.ul`
    margin-top: 20px;
`;
const CommentListItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
`;
const CommentArea = styled.div``;
const CommentTitle = styled.h2`
    margin-top: 50px;
    font-size: 16px;
    font-weight: 700;
`;
const CommentForm = styled.form`
    margin-top: 10px;
`;
const CommentInput = styled.input``;
const CommentLeftArea = styled(Link)`
    text-align: center;
`;
const CommentIcon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const CommentRightAreaHeader = styled.div`
    display: flex;
    align-items: center;
`;
const CommentRightArea = styled.div`
    margin-left: 20px;
`;
const CommentUsername = styled.p`
    font-size: 14px;
    font-weight: 700;
`;
const CommentDate = styled.span`
    margin-left: 10px;
    display: block;
    font-size: 11px;
`;
const CommentText = styled.span`
    margin-top: 10px;
    display: block;
    font-size: 14px;
`;
const CommentRemoveText = styled.button`
    margin-top: 10px;
    font-size: 14px;
`;
