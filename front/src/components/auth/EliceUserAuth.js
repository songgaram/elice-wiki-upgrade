import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import styles from "./EliceUserAuth.module.css";

const EliceUserAuth = () => {
    const question =
        "엘리스 레이서들의 체크인 체크아웃을 책임지는 이 거북이의 이름은 무엇일까요?";
    const [answer, setAnswer] = useState(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await Api.post("auth", {
                question,
                answer,
            });
            const user = res.data;
            dispatch(loginUser(user));
            navigate("/", { replace: true });
        } catch (error) {
            console.log("인증에 실패햐였습니다.", error);
        }
    };

    return (
        <div className={styles["wrapper"]}>
            <img src="/image/cal-bot.png" style={{ width: "40%" }} />
            <div className={styles["title"]}>
                엘리스 레이서들의 <br />
                <span style={{ color: "#7353EA" }}>"체크인/체크아웃"</span>을
                책임지는
                <br />이 <span style={{ color: "#C0CE5D" }}>거북이</span>의
                이름은 무엇일까요?
            </div>
            <div className={styles["sub_title"]}>
                * 띄어쓰기를 지켜서 작성해야 올바르게 적용됩니다.
            </div>
            <InputGroup className="mb-3" style={{ width: "25%" }}>
                <FormControl
                    onSubmit={(e) => handleSubmit(e)}
                    placeholder="정답을 적어주세요."
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button className={styles["btn"]} type="submit">
                    submit
                </Button>
            </InputGroup>
        </div>
    );
};
export default EliceUserAuth;
