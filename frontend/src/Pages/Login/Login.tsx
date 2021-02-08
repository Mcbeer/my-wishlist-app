import { GoogleLogin } from "react-google-login";
import { GoogleLogin as GoogleLoginArgs } from "../../Models/GoogleLogin";
import { useDispatch } from "react-redux";
import { signInUserFunction } from "../../Store/Actions/userActions";

export const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID || "";
  const dispatch = useDispatch();
  const handleLoginResponse = (response: GoogleLoginArgs) => {
    if (response && response?.profileObj) {
      const {
        email,
        givenName,
        familyName,
        googleId,
        imageUrl,
      } = response.profileObj;
      dispatch(signInUserFunction);
    } else {
      console.log("What is this response??");
    }
  };

  const handleFailedLogin = () => {};

  return (
    <div className="Login">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={handleLoginResponse}
        onFailure={handleFailedLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
