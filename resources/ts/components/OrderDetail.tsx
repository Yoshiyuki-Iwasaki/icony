import React from 'react';
import { useParams } from "react-router-dom";

const OrderDetail = () => {
    const { id }: any = useParams();
    return <div>OrderDetail{id} </div>;
}

export default OrderDetail;
