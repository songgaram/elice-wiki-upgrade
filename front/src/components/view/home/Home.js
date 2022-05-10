import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserHome from "./UserHome";

const Home = () => {
    const navigate = useNavigate();
    const params = useParams();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );
    const userAuthorized = userState.auth;
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    useEffect(() => {
        if (!userAuthorized) {
            navigate("/auth");
            return;
        }

        setIsFetchCompleted(true);
    }, [userState, navigate]);

    if (!isFetchCompleted) {
        return <div>로딩중...</div>;
    }

    return <>{userAuthorized ? <UserHome /> : <NotUserHome />}</>;
};

export default Home;
