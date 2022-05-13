import { Layout, Breadcrumb, Typography } from "antd";
import styles from "./Home.module.css";

const Home = () => {
    const { Header, Content } = Layout;
    return (
        <>
            <div className={styles.home_container}>
                <header style={{ height: "60px" }} />
                <Header className={styles.home_header}>
                    <Breadcrumb separator="|">
                        {new Array(24).fill(null).map((_, week) => (
                            <Breadcrumb.Item style={{}}>
                                <Typography.Link className={styles.home_week}>
                                    {String(week + 1).padStart(2, "0")}
                                </Typography.Link>
                            </Breadcrumb.Item>
                        ))}
                        <Breadcrumb.Item>
                            <Typography.Link>기타</Typography.Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content className={styles.contents_container}>
                    <div className={styles.home_side}></div>
                    <div className={styles.home_contents}>
                        <div>
                            <div>tag</div>
                            <div>title</div>
                        </div>
                        <div>
                            <div>tag</div>
                            <div>title</div>
                        </div>
                        <div>
                            <div>tag</div>
                            <div>title</div>
                        </div>{" "}
                        <div>
                            <div>tag</div>
                            <div>title</div>
                        </div>
                        <div>
                            <div>tag</div>
                            <div>title</div>
                        </div>
                    </div>
                    <div className={styles.home_side}></div>
                </Content>
            </div>
        </>
    );
};

export default Home;
