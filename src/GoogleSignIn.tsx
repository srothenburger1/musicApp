//@ts-nocheck
import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "612399434984-3bqm9gges27tses3f8vtub8111th9818.apps.googleusercontent.com";

const GoogleBtn = () => {
//   const state = {
//     isLoggedIn: false,
//     accessToken: null,
//     id: "",
//     firstName: "",
//     lastName: "",
//     emailAddress: "",
//     imageUrl: "",
//   };

  const [id, idSet] = useState(null);
  const [firstName, firstNameSet] = useState(null);
  const [lastName, lastNameSet] = useState(null);
  const [email, emailSet] = useState(null);
  const [imageUrl, imageUrlSet] = useState(null);
  const [isLoggedIn, isLoggedInSet] = useState(false);
  const [accessToken, accessTokenSet] = useState(null);

  const login = (response) => {
    if (response.accessToken) {
      idSet(response.getBasicProfile().getId());
      firstNameSet(response.getBasicProfile().getGivenName());
      lastNameSet(response.getBasicProfile().getFamilyName());
      emailSet(response.getBasicProfile().getEmail());
      imageUrlSet(response.getBasicProfile().getImageUrl());
      isLoggedInSet(true);
      accessTokenSet(response.access_token);
    }
    Window.userInfo = response;
  };

  const logout = (response) => {
    idSet(null);
    firstNameSet(null);
    lastNameSet(null);
    emailSet(null);
    imageUrlSet(null);
    isLoggedInSet(false);
    accessTokenSet(null);
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  return (
    <>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}

      {/* {this.state.accessToken ? (
          <>
            <h5>
              {this.state.firstName}
              {this.state.lastName} {this.state.emailAddress}{" "}
            </h5>
            <br />
            <br />
            <image src={this.state.imageUrl} />{" "}
          </>
        ) : null} */}

      {/* <textarea cols="80" rows="20" id="query-output"></textarea> */}
    </>
  );
};

export default GoogleBtn;
