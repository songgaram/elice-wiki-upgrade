import PostList from "./PostList";
import WeekList from "./WeekList";
import RecentList from "./RecentList";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles["wrapper-posts"]}>
      <WeekList />
      <PostList />
      <RecentList />
    </div>
  );
};

export default Home;
