import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const googleClientId = "737423363666-7a3hjt3o4vhjlmbh76vssra7781r7r37.apps.googleusercontent.com"; 
  const facebookAppId = "YOUR_FACEBOOK_APP_ID"; 

  const handleFormLogin = (event) => {
    event.preventDefault(); 
    localStorage.setItem("username",username)
    navigate('/home', { state: { username } });
  };

  const handleGoogleLogin = (response) => {
    console.log("Google login response:", response);
    navigate('/home', { state: { username: response.profileObj.name } });
  };

  const handleFacebookLogin = (response) => {
    console.log("Facebook login response:", response);
    navigate('/home', { state: { username: response.name } });
  };

  const handleLoginFailure = (response) => {
    console.error('Social login failed:', response);
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleFormLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />

      <FacebookLogin
        appId={facebookAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        onFailure={handleLoginFailure}
        icon="fa-facebook"
        textButton=" Login with Facebook"
      />
    </div>
  );
}

export default Login;
