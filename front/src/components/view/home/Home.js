import { Layout, Breadcrumb, Typography } from "antd";
import styles from "./Home.module.css";
import "antd/dist/antd.min.css";

const Home = () => {
    const { Header, Content } = Layout;
    return (
        <>
            <Layout className="layout">
                <Header className={styles.header}>
                    <Breadcrumb separator="|">
                        {new Array(23).fill(null).map((_, week) => (
                            <Breadcrumb.Item>
                                <Typography.Link>{week + 1}</Typography.Link>
                            </Breadcrumb.Item>
                        ))}
                        <Breadcrumb.Item>
                            <Typography.Link>기타</Typography.Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <div className="site-layout-content">Content</div>
                </Content>
            </Layout>
        </>
    );
};

export default Home;
