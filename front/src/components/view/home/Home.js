import PostList from "./PostList";
import WeekList from "./WeekList";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles["wrapper-posts"]}>
      <WeekList />
      <PostList />
    </div>
  );
};

export default Home;
