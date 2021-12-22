import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ProfileEdit = ({ user, getUser }: any) => {
    const [name, setName] = useState<string>("");
    console.log("user", user);
    // ログイン
    const profileEdit = async (e: any) => {
        e.preventDefault();
        const { error }: any = await axios
            .put(`/api/users/${user.id}`, {
                name,
            })
            .then((res) => {
                setName(res.data.user);
                getUser();
            })
            .catch((err) => {
                console.log(err.response);
            });
        console.log("profileEdit");
    };

    return (
        <>
            <Main>
                <Title>プロフィール編集</Title>
                <Form onSubmit={profileEdit}>
                    <Block>
                        <Label htmlFor="name">name</Label>
                        <Input
                            id="name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        ユーザー編集
                    </Block>
                    <ButtonArea>
                        <Button type="submit" onClick={profileEdit}>
                            ユーザー編集
                        </Button>
                    </ButtonArea>
                </Form>
            </Main>
        </>
    );
};

export default ProfileEdit


const Main = styled.div`
    padding: 40px 15px;
    position: fixed;
    background: #f3f3f3;
    height: 300px;
    width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Title = styled.h1`
    text-align: center;
    font-size: 18px;
    font-weight: 700;
`;
const Form = styled.form`
    margin-top: 45px;
`;
const Block = styled.div`
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }
`;
const Label = styled.label`
    font-size: 14px;
`;
const Input = styled.input`
    margin-top: 5px;
    display: block;
    width: 100%;
    font-size: 15px;
`;
const ButtonArea = styled.div`
    margin-top: 20px;
    text-align: center;
`;
const Button = styled.button`
    font-size: 14px;
`;
