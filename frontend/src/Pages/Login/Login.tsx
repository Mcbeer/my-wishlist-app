import { GoogleLogin, useGoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

export const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID || "";
  const dispatch = useDispatch();
  const handleLoginResponse = (response: unknown) => {
    console.log(response);
  };

  return (
    <div className="Login">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={handleLoginResponse}
        onFailure={handleLoginResponse}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
