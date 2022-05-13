import { Layout, Breadcrumb, Typography } from "antd";
import styles from "./Home.module.css";
import "antd/dist/antd.min.css";

const Home = () => {
    const { Header, Content } = Layout;
    return (
        <>
            <div className={styles.home_container}>
                <Header className={styles.home_header}>
                    <Breadcrumb separator="|">
                        {new Array(24).fill(null).map((_, week) => (
                            <Breadcrumb.Item style={{}}>
                                <Typography.Link>
                                    {String(week + 1).padStart(2, "0")}
                                </Typography.Link>
                            </Breadcrumb.Item>
                        ))}
                        <Breadcrumb.Item>
                            <Typography.Link>기타</Typography.Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content className={styles.home_contents}>
                    <div>Content</div>
                </Content>
            </div>
        </>
    );
};

export default Home;
