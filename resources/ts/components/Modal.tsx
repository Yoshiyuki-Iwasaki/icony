import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ModalType } from "../type/modal";

const Modal: React.FC<ModalType> = ({ user, getOrders }) => {
    const [content, setContent] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/orders", {
            requested_user_id: 2,
            requesting_user_id: user.id,
            content: content,
            category_id: 15,
            talkroom_id: 0,
        });
        console.log("error", error);
        setContent("");
        getOrders();
        setModalOpen(false);
    };
    const toggleOpen = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <>
            <ModalButton onClick={toggleOpen}></ModalButton>
            {modalOpen && (
                <ModalLayout>
                    <Overlay onClick={toggleOpen} />
                    <Inner>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Input
                                type="text"
                                placeholder="Todoを入力してください。"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form>
                    </Inner>
                </ModalLayout>
            )}
        </>
    );
};

export default Modal
const ModalLayout = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Inner = styled.div`
    padding: 30px;
    position: relative;
    background: #fff;
    z-index: 2;
`;
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 51px;
    background: rgba(0, 0, 0, 0.5);
    width: 120vw;
    height: 120vh;
    transform: translate(-50%, -50%);
    z-index: 1;
`;
const ModalButton = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: #555;

    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15px;
        height: 1px;
        background: #fff;
    }

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 15px;
        background: #fff;
    }
`;
const Form = styled.form``;
const Input = styled.input``;
