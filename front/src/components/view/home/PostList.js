import styles from "./PostList.module.css";
import { Badge } from "react-bootstrap";

const PostList = () => {
  return (
    <>
      <div className={styles["wrapper-post"]}>
        <div className={styles["tag"]}>
          <Badge pill bg="light" text="dark">
            CSS
          </Badge>{" "}
          <Badge pill bg="light" text="dark">
            React
          </Badge>{" "}
          <Badge pill bg="light" text="dark">
            Redux
          </Badge>{" "}
          <Badge pill bg="light" text="dark">
            Recoil
          </Badge>
        </div>
        <div className={styles["title"]}>
          Recoil로 어플리케이션 다크모드 구현하기
        </div>
      </div>
    </>
  );
};

export default PostList;
