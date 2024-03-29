import { BsGoogle } from "react-icons/bs";
import { PrimaryBtn } from "view/Intro/Intro.style";

export const handleGoogleLogin = () => {
    const protocol = window.location.protocol;
    const hostName = window.location.hostname;
    const port = window.location.port;
    let url = protocol + "//" + hostName + (port ? ":" + port : "") + "/test";
    window.location.href =
        "https://accounts.google.com/o/oauth2/auth?client_id=590638047439-2icndg9hnuf95mf4aajgua6ghijbchrt.apps.googleusercontent.com&redirect_uri=" +
        url +
        "&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
};

function OAuthButton() {
    return (
        <>
            <PrimaryBtn onClick={handleGoogleLogin}>
                <BsGoogle style={{ marginRight: "10px" }} /> 구글로 로그인하기
            </PrimaryBtn>
        </>
    );
}

export default OAuthButton;
