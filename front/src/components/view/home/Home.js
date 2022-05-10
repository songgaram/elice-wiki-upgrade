import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Api from "../api";

const Home = () => {
    const navigate = useNavigate();
    const params = useParams();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );
    const [homeOwner, setHomeOwner] = useState(null);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    useEffect(() => {
        if (!userState.auth) {
            navigate("/auth");
            return;
        }

        setIsFetchCompleted(true);
    }, [userState, navigate]);

    if (!isFetchCompleted) {
        return <div>로딩중...</div>;
    }

    return <div>HOME</div>;
};

export default Home;
