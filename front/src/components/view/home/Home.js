import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import styles from "./Home.module.css";

const Home = () => {
    return (
        <>
            <div className={styles.home_container}>
                <header style={{ height: "60px" }} />
                <div className={styles.home_header}>
                    <Button disabled style={{ color: "black" }}>
                        WEEK
                    </Button>

                    {new Array(24).fill(null).map((_, week) => (
                        <>
                            <Button sx={{ minWidth: "45px" }} variant="text">
                                {String(week + 1).padStart(2, "0")}
                            </Button>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                        </>
                    ))}

                    <Button color="primary">기타</Button>
                </div>
                <div className={styles.contents_container}>
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
                </div>
            </div>
        </>
    );
};

export default Home;
