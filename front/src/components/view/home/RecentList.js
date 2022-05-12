import React from "react";
import "antd/dist/antd.min.css";
import { Input, Space } from "antd";
const { Search } = Input;

const onSearch = (value) => console.log(value);

const RecentList = () => (
  <Space direction="vertical">
    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 }} />
  </Space>
);

export default RecentList;
