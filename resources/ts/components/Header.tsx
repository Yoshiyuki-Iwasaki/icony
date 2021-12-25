import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Header = ({ user, setUser, getUser }: any) => {
    const history = useHistory();
    // ブラウザリロード時にログイン済みか判定
    useEffect(() => {
        getUser();
    }, []);

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
        <>
            <HeaderLayout>
                <Inner>
                    <Title to="/">Icony</Title>
                    <RightArea>
                        {user ? (
                            <>
                                <Hover>
                                    <UserArea>
                                        <Icon>
                                            <img src="" />
                                        </Icon>
                                        <Username>
                                            {user.name}
                                        </Username>
                                    </UserArea>
                                    <List>
                                        <ListItem>
                                            <Link to={`/user/${user.id}`}>
                                                <LinkText>マイページ</LinkText>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link to="/profile/edit">
                                                <LinkText>
                                                    プロフィール編集
                                                </LinkText>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Button onClick={logout}>
                                                ログアウト
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Hover>
                            </>
                        ) : (
                            <>
                                <Auth to="/auth">ログイン</Auth>
                                <SignUp to="/signup">新規登録</SignUp>
                            </>
                        )}
                    </RightArea>
                </Inner>
            </HeaderLayout>
        </>
    );
};

export default Header;

const HeaderLayout = styled.header``;
const Inner = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1000px;
    height: 70px;
`;
const Title = styled(Link)`
    font-size: 22px;
    font-weight: 700;
`;
const RightArea = styled.div`
    display: flex;
`;
const UserArea = styled.div`
    display: flex;
    align-items: center;
`;
const Icon = styled.figure`
    width: 30px;
    height: 30px;
    background: #555;
    border-radius: 15px;
`;
const Username = styled.p`
    margin-left: 10px;
    font-size: 14px;
`;
const Auth = styled(Link)`
    margin-left: 10px;
    font-size: 14px;
`;
const SignUp = styled(Link)`
    margin-left: 10px;
    font-size: 14px;
`;

const Hover = styled.div`
    position: relative;
    cursor: pointer;
`;
const List = styled.ul`
    position: absolute;
    top: 40px;
    right: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.6s;

    ${Hover}:hover & {
        opacity: 1;
        visibility: visible;
    }
`;
const ListItem = styled.li`
    border-top: 1px solid #2b3a42;

    &:first-child {
        border-top: none;
    }
`;
const LinkText = styled.a`
    padding: 10px;
    text-align: center;
    width: 200px;
    display: inline-block;
    background: #f3f3f3;
    font-size: 13px;
`;
const Button = styled.button`
    padding: 10px;
    display: block;
    width: 100%;
    background: #f3f3f3;
    cursor: pointer;
    font-size: 13px;
`;
