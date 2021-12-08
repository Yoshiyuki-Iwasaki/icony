import React, { useState, useEffect } from "react";

const OrderList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/orders").then(res => {
            setPosts(res.data);
        });
    }, []);
    console.log("posts", posts);
    return (
        <>
            <ul>
                {posts.map(post => (
                    <li key={post.id}> {post.content} </li>
                ))}
            </ul>
        </>
    );
}

export default OrderList;

if (document.getElementById('orderList')) {
    ReactDOM.render(<OrderList />, document.getElementById("orderList"));
}
