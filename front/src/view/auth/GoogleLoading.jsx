import Spinner from "components/Spinner";
import { useUserLoginHandler } from "queries/userQuery";

const GoogleLoading = () => {
    const userLoginHandler = useUserLoginHandler();

    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");
    userLoginHandler.mutate(accessToken);

    return <Spinner />;
};

export default GoogleLoading;
