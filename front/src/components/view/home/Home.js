import OAuthButton from "../../auth/OAuthButton";
import { useSelector } from "react-redux";
import UserHome from "./UserHome";
import Intro from "../Intro/Intro";

const Home = () => {
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );

    return <>{userState?.authorized ? <UserHome /> : <Intro />}</>;
};

export default Home;
