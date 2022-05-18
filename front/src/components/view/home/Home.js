import OAuthButton from "../../auth/OAuthButton";
import { useSelector } from "react-redux";
import UserHome from "./UserHome";

const Home = () => {
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );

    return <>{userState?.authorized ? <UserHome /> : <OAuthButton />}</>;
};

export default Home;
