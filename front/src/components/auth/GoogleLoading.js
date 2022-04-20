<<<<<<< HEAD
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
=======
// import * as Api from "../../api";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../store/actions/userAction";
>>>>>>> origin/feature-login-front

// const GoogleLoading = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const parsedHash = new URLSearchParams(window.location.hash.substring(1));
//   const accessToken = parsedHash.get("access_token");

<<<<<<< HEAD
  const googleLogin = async () => {
    try {
      const {
        data: { user },
      } = await Api.post("user/sign", { accessToken });
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);
      dispatch(loginUser(user));
      navigate("/", { replace: true });
    } catch (e) {
      console.log("OAuth 에러", e);
    }
  };
  googleLogin();
=======
//   const googleLogin = async () => {
//     try {
//       const {
//         data: { user },
//       } = await Api.post("loading/google", { accessToken });
//       const jwtToken = user.token;
//       sessionStorage.setItem("userToken", jwtToken);
//       dispatch(loginUser(user));
//       navigate("/", { replace: true });
//     } catch (e) {
//       console.log("OAuth 에러", e);
//     }
//   };
//   googleLogin();
>>>>>>> origin/feature-login-front

//   return <div>로딩중...</div>;
// };

// export default GoogleLoading;
