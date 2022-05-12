import styles from "./WeekList.module.css";

const WeekList = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["border-line"]}>
        <div>WEEK</div>
        <div>
          01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 |
          15 | 16 | 17 | 18 | 20 | 21 | 22 | 23 | 24
        </div>
      </div>
    </div>
  );
};

export default WeekList;
