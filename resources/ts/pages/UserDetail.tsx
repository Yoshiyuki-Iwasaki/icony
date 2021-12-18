import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const UserDetail = () => {
    const { id }: any = useParams();
    const [users, setUsers] = useState<any>([]);

    const getUser = async () => {
        axios.get(`/api/users/${id}`).then((res) => {
            setUsers(res.data);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {users && (
                <>
                    <UserName>{users.name}</UserName>
                    <Introduction>{users.introduction}</Introduction>
                </>
            )}
        </>
    );
};

export default UserDetail;

const UserName = styled.p`
    font-size: 14px;
`;
const Introduction = styled.p`
    margin-top: 10px;
    font-size: 14px;
`;
