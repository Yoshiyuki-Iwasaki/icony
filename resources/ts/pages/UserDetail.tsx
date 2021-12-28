import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../util/date";
import { UserDetailType } from "../type/UserDetail";

const UserDetail: React.FC<UserDetailType> = ({ myUser }) => {
    const { id }: any = useParams();
    const [users, setUsers] = useState<any>([]);
    const [follows, setFollows] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        getUser();
        getFollow();
        getOrders();
    }, []);

    const getUser = async () => {
        axios.get(`/api/users/${id}`).then((res) => {
            setUsers(res.data);
        });
    };

    const getOrders = async () => {
        axios.get("/api/orders").then((res) => {
            setOrders(res.data);
            console.log("res.data", res.data);
        });
    };

    const getFollow = () => {
        axios
            .get("/api/follows")
            .then((res) => {
                if (res.data) {
                    console.log("res", res);
                    setFollows(res.data);
                } else {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRemove = async (e: any, id: number) => {
        e.preventDefault();
        const result = window.confirm("本当にこの投稿を削除しますか。");
        if (result) {
            const { error }: any = await axios.delete(`/api/orders/${id}`);
            console.log("error", error);
            getOrders();
        }
    };

    const insertFollow = async (e: any, follow_id: number) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/follows", {
            followed_user_id: follow_id,
            following_user_id: myUser.id,
        });
        console.log("error", error);
        getFollow();
    };

    const removeFollow = async (e: any, follow_id: number) => {
        e.preventDefault();
        const followsFilter = follows.filter((follow: any) => {
            return (
                follow.followed_user_id.id === follow_id &&
                follow.following_user_id.id === myUser.id
            );
        });
        const { error }: any = await axios.delete(
            `/api/follows/${followsFilter[0].id}`
        );
        console.log("error", error);
        getFollow();
    };

    const followFunction = (follow_id: number) => {
        const followsFilter = follows.filter((follow: any) => {
            console.log(follow.following_user_id.id, myUser.id);
            console.log(follow.followed_user_id.id, follow_id);
            return (
                follow.followed_user_id.id === follow_id &&
                follow.following_user_id.id === myUser.id
            );
        });

        if (followsFilter.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    const createTalk = async () => {
        console.log("test");
    };

    return (
        <>
            {users && (
                <>
                    <UserHeader>
                        <IconBg></IconBg>
                        <Icon>
                            <img src="" />
                        </Icon>
                        <UserName>{users.name}</UserName>
                        <Introduction>{users.introduction}</Introduction>
                        {myUser && users.id != myUser.id && (
                            <>
                                {follows && followFunction(users.id) ? (
                                    <FollowButton
                                        onClick={(e) =>
                                            removeFollow(e, users.id)
                                        }
                                    >
                                        フォロー済み
                                    </FollowButton>
                                ) : (
                                    <FollowButton
                                        onClick={(e) =>
                                            insertFollow(e, users.id)
                                        }
                                    >
                                        フォロー
                                    </FollowButton>
                                )}
                                <button onClick={createTalk}>チャット</button>
                                <Link to={`/talkroom`}>チャット(遷移のみ)</Link>
                            </>
                        )}
                    </UserHeader>
                    <UserPost>
                        {orders.map((order: any) => (
                            order.requesting_user_id == id && (
                            <ListItem key={order.id}>
                                <Block to={`/orders/${order.id}`}>
                                    <LeftArea
                                        to={`/user/${order.requesting_user.id}`}
                                    >
                                        <ListIcon>
                                            <img src="" />
                                        </ListIcon>
                                    </LeftArea>
                                    <RightArea>
                                        <RightAreaHeader>
                                            <Username>
                                                {order.requesting_user.name}
                                            </Username>
                                            <Date>
                                                {formatDate(order.created_at)}
                                            </Date>
                                        </RightAreaHeader>
                                        <Text>{order.content}</Text>
                                        <RemoveText
                                            onClick={(e) =>
                                                handleRemove(e, order.id)
                                            }
                                        >
                                            削除
                                        </RemoveText>
                                    </RightArea>
                                </Block>
                            </ListItem>
                            )
                        ))}
                    </UserPost>
                </>
            )}
        </>
    );
};

export default UserDetail;

const IconBg = styled.div`
    height: 100px;
    background-color: #15202b;
`;
const UserHeader = styled.div``;
const Icon = styled.figure`
    margin: -50px auto 0;
    width: 100px;
    height: 100px;
    background: #555;
    border-radius: 50px;
`;
const ListIcon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const UserName = styled.p`
    margin-top: 10px;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
`;
const Introduction = styled.p`
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
`;
const FollowButton = styled.button``;
const UserPost = styled.ul`
    margin-top: 20px;
`;

const ListItem = styled.li`
    position: relative;
    border-bottom: 1px solid #555;
`;
const Block = styled(Link)`
    margin-bottom: 10px;
    padding: 10px 10px 20px 10px;
    display: flex;
`;
const LeftArea = styled(Link)`
    text-align: center;
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
