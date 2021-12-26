import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Sidebar = ({ user, setUser, getUser }: any) => {
    const history = useHistory();

    const logout = () => {
        axios
            .post("/api/logout")
            .then((res) => {
                setUser(null);
                getUser();
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <List>
            <ListItem>
                <LinkText to={`/`}>ホーム</LinkText>
            </ListItem>
            <ListItem>
                <LinkText to={`/user/${user.id}`}>プロフィール</LinkText>
            </ListItem>
            <ListItem>
                <LinkText to="/profile/edit">プロフィール編集</LinkText>
            </ListItem>
            <ListItem>
                <Button onClick={logout}>ログアウト</Button>
            </ListItem>
        </List>
    );
};

export default Sidebar


const List = styled.ul``;
const ListItem = styled.li`
    margin-top: 15px;
    &:first-child {
        margin-top: 0;
    }
`;
const LinkText = styled(Link)`
    font-size: 16px;
    font-weight: 700;
`;
const Button = styled.button`
    font-size: 16px;
    font-weight: 700;
`;
