import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { formatDate } from "../util/date";

const OrderDetail = () => {
    const { id }: any = useParams();
    const [orders, setOrders] = useState<any>([]);
    const [user, setUser] = useState<any>();
    const [comments, setComments] = useState<any>([]);
    const [content, setContent] = useState<any>();

    useEffect(() => {
        getOrder();
        getComment();
    }, []);

    const getOrder = async () => {
        axios.get(`/api/orders/${id}`).then((res) => {
            setOrders(res.data);
            setUser(res.data.requesting_user);
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
            order_id: 4,
            user_id: 2,
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
            <CommentArea>
                <CommentTitle>コメント一覧</CommentTitle>
                <CommentList>
                    {comments.map(
                        (comment: any, index: number) =>
                            comment.order_id.id == id && (
                                <CommentListItem key={index}>
                                    <CommentLeftArea>
                                        <CommentIcon>
                                            <img src="" />
                                        </CommentIcon>
                                        <CommentUsername>
                                            {comment.user_id.name}
                                        </CommentUsername>
                                    </CommentLeftArea>
                                    <CommentRightArea>
                                        <CommentDate>
                                            {formatDate(comment.created_at)}
                                        </CommentDate>
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
const CommentList = styled.ul`
    margin-top: 20px;
`;
const CommentListItem = styled.li`
    margin-top: 10px;
    display: flex;
`;
const CommentArea = styled.div`
    margin-top: 20px;
`;
const CommentTitle = styled.h2``;
const CommentForm = styled.form`
    margin-top: 10px;
`;
const CommentInput = styled.input``;
const CommentLeftArea = styled.div`
    text-align: center;
`;
const CommentIcon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const CommentUsername = styled.p`
    margin-top: 5px;
    font-size: 13px;
`;
const CommentRightArea = styled.div`
    margin-left: 20px;
`;
const CommentDate = styled.span`
    display: block;
    font-size: 13px;
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
