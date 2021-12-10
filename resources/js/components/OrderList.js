import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

const OrderList = () => {
    const [posts, setPosts] = useState([]);
    const getTasks = async () => {
        axios.get("http://127.0.0.1:8000/api/orders").then(res => {
            setPosts(res.data);
        });
    }
    useEffect(() => {

    }, []);
    console.log("posts", posts);
    return (
        <>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <span> {post.created_at} </span>
                        <span> {post.content} </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default OrderList;

if (document.getElementById('orderList')) {
    ReactDOM.render(<OrderList />, document.getElementById("orderList"));
}
