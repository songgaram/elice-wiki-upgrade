import React from "react";
// import Api from "../../../api";

import styled from "./RecentList.module.css";
import "antd/dist/antd.min.css";
import { Input, Space, Card } from "antd";
const { Search } = Input;

// const posts = Api.get("");
const posts = [
  {
    _id: "1",
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    description: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    author: "KIM HYUNSEO",
    createdAt: "2051-03-25T00:00:00",
  },
  {
    _id: "2",
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    description: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    author: "KIM HYUNSEO",
    createdAt: "2051-03-25T00:00:00",
  },
  {
    _id: "3",
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    description: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    author: "KIM HYUNSEO",
    createdAt: "2051-03-25T00:00:00",
  },
  {
    _id: "4",
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    description: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    author: "KIM HYUNSEO",
    createdAt: "2051-03-25T00:00:00",
  },
];

const onSearch = (value) => console.log(value);

const RecentList = () => (
  <>
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ width: 300, borderRadius: 16 }}
      />
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </Space>
    <Space direction="vertical" size="small" style={{ display: "flex" }}>
      {posts
        .map((post) => (
          <Card
            key={post._id}
            size="small"
            className={styled.card}
            style={{
              width: 300,
              height: 80,
              borderRadius: 6,
              background: "linear-gradient(#E5E5E5, white)",
            }}
          >
            <h4 className={styled.title}>{post.title}</h4>
            <p className={styled.description}>{post.description}</p>
            <p className={styled.author}>{post.author}</p>
            <p className={styled.createdAt}>{post.createdAt.split("T")[0]}</p>
          </Card>
        ))
        .slice(0, 3)}
    </Space>
  </>
);

export default RecentList;
