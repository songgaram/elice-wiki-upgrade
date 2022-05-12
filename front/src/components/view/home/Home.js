import React from "react";
import OAuthButton from "../../auth/OAuthButton";
import { useSelector } from "react-redux";
import UserHome from "./UserHome";

const Home = () => {
  const userState = useSelector((state) =>
    state ? state.userReducer.user : undefined
  );

  return <>{userState?.auth ? <UserHome /> : <OAuthButton />}</>;
};

export default Home;
