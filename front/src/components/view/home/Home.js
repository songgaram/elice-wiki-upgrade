<<<<<<< HEAD
import React from "react";
import OAuthButton from "../../auth/OAuthButton";

const Home = () => {
  return <OAuthButton />;
};
=======
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import * as Api from "../api";

// const Home = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const userState = useSelector((state) => state.userReducer.user);
//   const [homeOwner, setHomeOwner] = useState(null);
//   const [isFetchCompleted, setIsFetchCompleted] = useState(false);

//   // IsFetchCompleted == true 라면 렌더링 시작
//   const fetchPorfolioOwner = async (ownerId) => {
//     const res = await Api.get("users", ownerId);
//     const ownerData = res.data;
//     setHomeOwner(ownerData);
//     setIsFetchCompleted(true);
//   };

//   useEffect(() => {
//     if (!userState) {
//       // console.log("userState", userState);
//       navigate("/login", { replace: true });
//       return;
//     }

//     if (params.userId) {
//       const ownerId = params.userId;
//       fetchPorfolioOwner(ownerId);
//     } else {
//       const ownerId = userState.id;
//       fetchPorfolioOwner(ownerId);
//     }
//   }, [params, userState, navigate]);

//   if (!isFetchCompleted) {
//     return <div>로딩중...</div>;
//   }

//   return <div>HOME</div>;
// };
>>>>>>> origin/feature-login-front

// export default Home;
