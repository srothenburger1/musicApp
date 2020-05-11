//@ts-nocheck
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "612399434984-3bqm9gges27tses3f8vtub8111th9818.apps.googleusercontent.com";

/*
{
  Ca: google id 
  Qt: {
    Ad: user full name,
    DU: user last name,
    DW: user first name,849ab76013bc143e6a77bb65833b5a551d6fa178
    ZU: google id,

  },
  accessToken: string,
  googleId: id ,
  profileObj: {
    email,
    familyName,
    givenName,
    googleId,
    imageUrl,
    name
  },
  tc: {
    access_token: same as before,
    expires_at: number, // its hard to say what format this is
    expires_in: number,
    first_issued_at: number, // also hard to determine
    id_token: really long string,
    idpId: google,
    login_hint: hashed mess,
    scope: looks like a list of links for user info,
    session_state: {
      extraQueryParams: {
        authUser: number
      },
      token_type: "Bearer"
    }
    tokenId: really long string
  },
  tokenObj: {
    access_token: same as before,
    expires_at: number, // its hard to say what format this is
    expires_in: number,
    first_issued_at: number, // also hard to determine
    id_token: really long string,
    idpId: google,
    login_hint: hashed mess,
    scope: looks like a list of links for user info,
    session_state: {
      extraQueryParams: {
        authUser: number
      },
      token_type: "Bearer"
    }
    tokenId: really long string
  }, ​​
  disconnect: function disconnect()​​​​
  getAuthResponse: function kk(a)​​
  getBasicProfile: function eV()​​
  getGrantedScopes: function GV()​​
  getHostedDomain: function gB()​​
  getId: function getId()​​
  grant: function GW(a)​​
  grantOfflineAccess: function Xq(a)​​
  hasGrantedScopes: function xv(a)​​
  isSignedIn: function Kf()​​
  reloadAuthResponse: function TD()​​
  update: function update(a)​​
}
*/

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      accessToken: null,
      id: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      imageUrl: "",
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    this.queryReports = this.queryReports.bind(this);
    this.displayResults = this.displayResults.bind(this);


  }

  login(response) {
    if (response.access_token) {
      this.setState((state) => ({
        isLoggedIn: true,
        accessToken: response.access_token,
        firstName: () => {
          response.getBasicProfile().getGivenName();
        },
        lastName: () => {
          response.getBasicProfile().getFamilyName();
        },
        emailAddress: () => {
          response.getBasicProfile().getEmail();
        },
        imageUrl: () => {
          response.getBasicProfile().getImageUrl();
        },
        firstName: () => {
          response.getBasicProfile().getGivenName();
        },
        id: () => {
          response.getBasicProfile().getId();
        },
      }));
    }
    Window.userInfo = response;
    this.queryReports()
  }

  logout(response) {
    this.setState((state) => ({
      isLoggedIn: false,
      accessToken: "",
    }));
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    document.getElementById('query-output').value = formattedJson;
  }

   queryReports() {
    window.gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: "108777989923642700802",
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              }
            ]
          }
        ]
      }
    }).then((response)=>console.log(response)).catch((e)=>{console.log(e)});
  }

  



  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}

        {this.state.accessToken ? (
          <>
            <h5>
              {this.state.firstName}
              {this.state.lastName} {this.state.emailAddress}{" "}
            </h5>
            <br />
            <br />
            <image src={this.state.imageUrl} />{" "}
          </>
        ) : null}
      
<textarea cols="80" rows="20" id="query-output"></textarea>

      </div>
    );
  }
}

export default GoogleBtn;
