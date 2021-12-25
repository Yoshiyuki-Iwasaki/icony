import dayjs from "dayjs";
import React from "react";

type formatDate = {
    dateText: any;
};

const formatDate = ({ dateText }: formatDate) => {
    return dayjs(dateText).format("YYYY-MM-DD HH:mm");
};
export default formatDate;
