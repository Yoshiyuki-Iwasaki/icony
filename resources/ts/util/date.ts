import dayjs from "dayjs";
import React from "react";

export const formatDate = (dateText: any) => {
    return dayjs(dateText).format("YYYY-MM-DD HH:mm");
};
