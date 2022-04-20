import { InputGroup, FormControl, Button } from "react-bootstrap";
import styles from "./EliceUserAuth.module.css";
const EliceUserAuth = () => {
  return (
    <div className={styles["wrapper"]}>
      <img src="/image/cal-bot.png" style={{ width: "40%" }} />
      <div className={styles["title"]}>
        엘리스 레이서들의 <br />
        <span style={{ color: "#7353EA" }}>"체크인/체크아웃"</span>을 책임지는
        <br />이 <span style={{ color: "#C0CE5D" }}>거북이</span>의 이름은
        무엇일까요?
      </div>
      <div className={styles["sub_title"]}>
        * 띄어쓰기를 지켜서 작성해야 올바르게 적용됩니다.
      </div>
      <InputGroup className="mb-3" style={{ width: "25%" }}>
        <FormControl
          placeholder="정답을 적어주세요."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button className={styles["btn"]}>submit</Button>
      </InputGroup>
    </div>
  );
};
export default EliceUserAuth;
