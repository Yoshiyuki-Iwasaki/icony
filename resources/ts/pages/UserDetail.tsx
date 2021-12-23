import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"

const UserDetail = ({ myUser }:any) => {
    const { id }: any = useParams();
    const [users, setUsers] = useState<any>([]);
    const [follows, setFollows] = useState<any>([]);

    useEffect(() => {
        getUser();
        getFollow();
    }, []);

    const getUser = async () => {
        axios.get(`/api/users/${id}`).then((res) => {
            setUsers(res.data);
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

    const followFunction = (follow_id:number) => {
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
    };;

    return (
        <>
            {users && (
                <>
                    <Icon>
                        <img src="" />
                    </Icon>
                    <UserName>{users.name}</UserName>
                    <Introduction>{users.introduction}</Introduction>
                    {console.log("users.id", users.id, "myUser", myUser)}
                    {myUser && users.id != myUser.id && (
                        <>{
                            follows && followFunction(users.id) ? (
                                <FollowButton
                                    onClick={(e) => removeFollow(e, users.id)}
                                >
                                    フォロー済み
                                </FollowButton>
                            ) : (
                                <FollowButton
                                    onClick={(e) => insertFollow(e, users.id)}
                                >
                                    フォロー
                                </FollowButton>
                            )
                        }
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default UserDetail;

const Icon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const UserName = styled.p`
    font-size: 14px;
`;
const Introduction = styled.p`
    margin-top: 10px;
    font-size: 14px;
`;
const FollowButton = styled.button`
`;
