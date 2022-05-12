import { Layout, Menu, Breadcrumb, Space, Typography, Divider } from "antd";
import styles from "./Home.module.css";

const Home = () => {
    const { Header, Content, Footer } = Layout;
    return (
        <Layout className="layout">
            <Header>
                <Space split={<Divider type="vertical" />}>
                    {new Array(15).fill(null).map((_, week) => (
                        <Typography.Link>{week + 1}</Typography.Link>
                    ))}
                </Space>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default Home;
