import React from "react";
import OAuthButton from "../../auth/OAuthButton";
import { useSelector } from "react-redux";
import UserHome from "./UserHome";

const Home = () => {
  const userState = useSelector((state) =>
    state ? state.userReducer.user : undefined
  );
  // 로그인 상태가 맞으면 -> auth 있으면 유저홈 없으면 auth, 로그인 안한 상태면 oauthbutton
  return <>{userState ? <UserHome /> : <OAuthButton />}</>;
};

export default Home;
