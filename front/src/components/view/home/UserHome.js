import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserHome() {
    const navigate = useNavigate();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );
    const userAuthorized = userState?.authorized;
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    useEffect(() => {
        if (!userAuthorized) {
            navigate("/auth");
            return;
        }

        setIsFetchCompleted(true);
    }, [userAuthorized, navigate]);

    if (!isFetchCompleted) {
        return <div>로딩중...</div>;
    }
    return <div>userHome</div>;
}

export default UserHome;
