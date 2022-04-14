import React, { useState, useEffect } from "react";
// import * as Api from "../../api";
import styled from "../../styles/user.module.css";

const User = () => {
    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);
    const [isEditable, setIsEditable] = useState(true);

    useEffect(() => {
        // Api.get("users", user_id).then((res) => setUser(res.data));
        setUser({
            id: "70f9e61f-092f-438b-a268-c8c38369a0a3",
            name: "KIM HYUNSEO",
            description: "NodeJS Developer",
            email: "khs050305@naver.com",
            image: "https://avatars.githubusercontent.com/u/74223263?v=4",
            likes: [],
            createdAt: "2022-03-26T09:39:51.049+00:00",
            updatedAt: "2022-03-26T09:41:22.622+00:00",
            __v: 0,
        });
    }, []);

    useEffect(() => {
        // Api.get("posts", user_id).then((res) => setUser(res.data));
        setPosts([
            {
                id: "1",
                user_id: "70f9e61f-092f-438b-a268-c8c38369a0a3",
                title: "Recoil로 어플리케이션 다크모드 구현하기",
                description: "개인 프로젝트 다크모드를 구현하던 도중 문득 Recoil로 기능을 구현하고 싶었다.",
                tags: ["CSS싫어요", "리액트"],
                createdAt: "2022-04-11T09:39:51.049+00:00",
                updatedAt: "2022-04-11T09:41:22.622+00:00",
                __v: 0,
            },
            {
                id: "2",
                user_id: "70f9e61f-092f-438b-a218-c8c38369a0a3",
                title: "Recoil로 어플리케이션 다크모드 구현하기",
                description: "개인 프로젝트 다크모드를 구현하던 도중 문득 Recoil로 기능을 구현하고 싶었다.",
                tags: ["CSS싫어요", "리액트"],
                createdAt: "2022-04-11T09:39:51.049+00:00",
                updatedAt: "2022-04-11T09:41:22.622+00:00",
                __v: 0,
            },
            {
                id: "3",
                user_id: "70f9261f-092f-438b-a268-c8c38369a0a3",
                title: "Recoil로 어플리케이션 다크모드 구현하기",
                description: "개인 프로젝트 다크모드를 구현하던 도중 문득 Recoil로 기능을 구현하고 싶었다.",
                tags: ["CSS싫어요", "리액트"],
                createdAt: "2022-04-11T09:39:51.049+00:00",
                updatedAt: "2022-04-11T09:41:22.622+00:00",
                __v: 0,
            },
        ]);
    }, []);

    return (
        <>
            <article className={styled.user_container}>
                <img className={styled.user_image} src={user.image} alt={`${user.name}'s Profile`}></img>
                <h1 className={styled.user_name}>{user.name}</h1>
                <h4 className={styled.user_description}>{user.description}</h4>
                {isEditable && <button className={styled.user_button}>Edit Profile</button>}
                <span className={styled.user_like}>
                    ⭐&nbsp;&nbsp;<strong>0</strong>&nbsp;likes
                </span>
            </article>
            <article className={styled.post_container}>
                {posts.slice(0, 5).map((posts) => (
                    <div className={styled.post}>
                        {posts.tags.map((tags) => (
                            <button key={Math.random() * 1000} className={styled.post_tag}>
                                {tags}
                            </button>
                        ))}
                        <h1 className={styled.post_title}>{posts.title}</h1>
                        <h4 className={styled.post_description}>{posts.description}</h4>
                        <span className={styled.post_date}>{posts.createdAt.split("T")[0].replaceAll("-", ".")}</span>
                    </div>
                ))}
            </article>
        </>
    );
};

export default User;
