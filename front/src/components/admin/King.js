import React, { useEffect, createContext, useState } from "react";
import * as Api from "../../api";
import { Header, H1, Small, HeaderNav, Nav, Body } from "../../styles/admin";
import { Table } from "react-bootstrap";

const King = () => {
    // const AdminContext = createContext();
    const [posts, setPosts] = useState([]);

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
            <Header style={{ display: "flex" }}>
                <H1>
                    #elice-wiki&nbsp;<Small>Admin Page</Small>
                </H1>
                <HeaderNav>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/users/:userId">My Page</a>
                    </li>
                </HeaderNav>
            </Header>
            <Nav>
                <br />
                <li style={{ marginLeft: 20, lineHeight: 2 }}>Posts</li>
                <li style={{ marginLeft: 20, lineHeight: 2 }}>Users</li>
                <li style={{ marginLeft: 20, lineHeight: 2 }}>Auth Questions</li>
            </Nav>
            <Body style={{ padding: 20 }}>
                <h1 style={{ fontSize: 30, marginTop: 20 }}>Post List</h1>
                <Table striped bordered hover size="sm" style={{ margin: "20px 0" }}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((posts) => (
                            <tr key={posts.id}>
                                <td>{1}</td>
                                <td>{posts.title}</td>
                                <td>{posts.author}</td>
                                <td>{posts.createdAt.split("T")[0].replaceAll("-", ".")}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </Body>
        </>
    );
};

export default King;
