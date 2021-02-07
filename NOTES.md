import { GoogleLogin } from "react-google-login";

export const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID || "";
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


REACT_APP_GOOGLE_CLIENTID=682313010343-60fbkmn1h0oqd10khr84b59dvuvsrgmf.apps.googleusercontent.com
