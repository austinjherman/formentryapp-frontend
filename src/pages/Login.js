import React from 'react';
import validator from 'validator';
import colors from '../styles/colors';
import styled from 'styled-components';

const FlashMessage = ({msg}) => {
  if (msg) {
    return (
      <div className="login__msg">
        <p>{msg}</p>
      </div>
    )
  }
  return null;
}

const FieldMessage = ({msg}) => {
  if (msg) {
    return (
      <span className="d-block errormsg">
        <p>{msg}</p>
      </span>
    )
  }
  return null;
}


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      errorMsg: null,
      v: {
        once: false,
        errors: {
          email: null,
          password: null
        }
      }
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleEmailValidation() {
    let v = this.state.v;
    if(validator.isEmail(this.state.email)) {
      v.errors.email = null;
      this.setState({v});
      return true;
    }
    v.errors.email = "Please provide a valid email address.";
    this.setState({v});
    return false;
  }

  handlePasswordValidation() {
    let v = this.state.v;
    if(this.state.password.length) {
      v.errors.password = null;
      this.setState({v});
      return true;
    }
    v.errors.password = "The password field is required.";
    this.setState({v});
    return false;
  }

  handleSubmit(event) {

    event.preventDefault();

    for(var e in this.state.v.errors) {
      if (this.state.v.errors[e] != null) {
        return;
      }
    }

    fetch('http://local.formapp.api.com/auth/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(
      (response) => {
        response.json().then(
          (responseData) => {
            console.log('responseData: ', responseData);
            if(responseData.error) {
              this.setState({
                errorMsg: responseData.error
              })
            }
            else if(typeof responseData.token !== 'undefined' && responseData.token.length) {
              this.setState({
                errorMsg: null
              })
              localStorage.setItem('formentrytoken', responseData.token);
              this.props.history.push('/dashboard');
            }
          },
          (error) => {
            console.log('error: ', error);
            this.setState({
              error
            })
            this.setState({
              errorMsg: "Sorry! There was a problem logging you in. Please try again later."
            })
          },
        );
      },
      (error) => {
        console.log('error: ', error);
        this.setState({
          error
        })
        this.setState({
          errorMsg: "Sorry! There was a problem logging you in. Please try again later."
        })
      },
    );
  }

  render() {
    return (
      <LoginPage>
        <div className="login__wrap">
          <div className="login__form__container">
            <div className="login__logo">
              <svg width="75px" height="95px" viewBox="0 0 75 95" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Group 8</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Desktop-HD" transform="translate(-116.000000, -247.000000)">
                    <g id="Group-8" transform="translate(116.000000, 247.000000)">
                      <path d="M8.5919,90.2515 L7.1659,87.1565 L7.1479,87.1565 L5.7409,90.2515 L8.5919,90.2515 Z M0.8819,94.2655 L6.7539,81.6405 C6.8099,81.5285 6.9409,81.4345 7.0719,81.4345 L7.2599,81.4345 C7.3909,81.4345 7.5229,81.5285 7.5789,81.6405 L13.4509,94.2655 C13.5629,94.5095 13.4129,94.7535 13.1319,94.7535 L11.0499,94.7535 C10.7119,94.7535 10.5619,94.6415 10.3929,94.2845 L9.7179,92.8025 L4.6149,92.8025 L3.9399,94.3035 C3.8459,94.5285 3.6399,94.7535 3.2639,94.7535 L1.2009,94.7535 C0.9199,94.7535 0.7689,94.5095 0.8819,94.2655 L0.8819,94.2655 Z" id="Fill-89" fill="#fff"></path>
                      <path d="M28.1953,81.4347 C30.0713,81.4347 31.4593,82.0157 32.7353,83.1797 C32.9033,83.3297 32.9033,83.5547 32.7543,83.7047 L31.2903,85.2237 C31.1593,85.3557 30.9533,85.3557 30.8213,85.2237 C30.1273,84.6047 29.2083,84.2677 28.2893,84.2677 C26.1693,84.2677 24.6123,86.0307 24.6123,88.1317 C24.6123,90.2137 26.1883,91.9397 28.3073,91.9397 C29.1893,91.9397 30.1463,91.6207 30.8213,91.0397 C30.9533,90.9267 31.1963,90.9267 31.3093,91.0587 L32.7723,92.6157 C32.9033,92.7467 32.8853,92.9907 32.7543,93.1217 C31.4783,94.3597 29.8653,94.9417 28.1953,94.9417 C24.4433,94.9417 21.4233,91.9587 21.4233,88.2067 C21.4233,84.4547 24.4433,81.4347 28.1953,81.4347" id="Fill-90" fill="#fff"></path>
                      <path d="M43.8029,81.7348 C43.8219,81.5658 43.9909,81.4348 44.1409,81.4348 L44.4409,81.4348 C44.5349,81.4348 44.7029,81.5098 44.7599,81.6218 L49.1119,89.7268 L49.1499,89.7268 L53.5019,81.6218 C53.5579,81.5098 53.7269,81.4348 53.8199,81.4348 L54.1209,81.4348 C54.2709,81.4348 54.4389,81.5658 54.4579,81.7348 L56.5779,94.3408 C56.6159,94.5848 56.4469,94.7538 56.2219,94.7538 L54.0079,94.7538 C53.8389,94.7538 53.6699,94.6038 53.6519,94.4538 L52.8079,88.6568 L52.7699,88.6568 L49.6179,94.7348 C49.5619,94.8478 49.3929,94.9418 49.2989,94.9418 L48.9619,94.9418 C48.8489,94.9418 48.6989,94.8478 48.6429,94.7348 L45.4729,88.6568 L45.4349,88.6568 L44.6099,94.4538 C44.5909,94.6038 44.4409,94.7538 44.2529,94.7538 L42.0399,94.7538 C41.8139,94.7538 41.6459,94.5848 41.6829,94.3408 L43.8029,81.7348 Z" id="Fill-91" fill="#fff"></path>
                      <path d="M66.4825,81.9787 C66.4825,81.7907 66.6325,81.6227 66.8395,81.6227 L74.6055,81.6227 C74.8115,81.6227 74.9615,81.7907 74.9615,81.9787 L74.9615,84.0237 C74.9615,84.2107 74.8115,84.3797 74.6055,84.3797 L69.4095,84.3797 L69.4095,86.7057 L73.6865,86.7057 C73.8735,86.7057 74.0425,86.8747 74.0425,87.0627 L74.0425,89.1077 C74.0425,89.3137 73.8735,89.4637 73.6865,89.4637 L69.4095,89.4637 L69.4095,91.9957 L74.6055,91.9957 C74.8115,91.9957 74.9615,92.1647 74.9615,92.3527 L74.9615,94.3977 C74.9615,94.5847 74.8115,94.7537 74.6055,94.7537 L66.8395,94.7537 C66.6325,94.7537 66.4825,94.5847 66.4825,94.3977 L66.4825,81.9787 Z" id="Fill-92" fill="#fff"></path>
                      <path d="M35.1316,12.8255 C36.7056,12.8255 37.9826,11.5495 37.9826,9.9745 C37.9826,8.3995 36.7056,7.1235 35.1316,7.1235 C33.5566,7.1235 32.2806,8.3995 32.2806,9.9745 C32.2806,11.5495 33.5566,12.8255 35.1316,12.8255" id="Fill-93" fill="#8BEA7D"></path>
                      <path d="M42.7109,7.3451 C44.5289,7.3451 46.0029,5.8711 46.0029,4.0531 C46.0029,2.2351 44.5289,0.7621 42.7109,0.7621 C40.8929,0.7621 39.4189,2.2351 39.4189,4.0531 C39.4189,5.8711 40.8929,7.3451 42.7109,7.3451" id="Fill-94" fill="#8BEA7D"></path>
                      <path d="M46.9868,59.5195 L28.7948,59.5195 C26.7598,59.5195 25.5618,57.2355 26.7188,55.5615 L36.0238,42.0945 C37.0398,40.6235 39.2218,40.6465 40.2058,42.1385 L49.0928,55.6055 C50.2008,57.2835 48.9968,59.5195 46.9868,59.5195 M58.0568,56.0575 L45.1258,34.6995 L45.1258,22.7715 L45.4398,22.7715 C47.3108,22.7715 48.8278,21.2535 48.8278,19.3825 C48.8278,17.5115 47.3108,15.9945 45.4398,15.9945 L30.3668,15.9945 C28.4958,15.9945 26.9778,17.5115 26.9778,19.3825 C26.9778,21.2535 28.4958,22.7715 30.3668,22.7715 L30.6808,22.7715 L30.6808,34.6995 L17.7498,56.0575 C15.4838,60.6075 18.7938,65.9525 23.8768,65.9525 L51.9288,65.9525 C57.0128,65.9525 60.3218,60.6075 58.0568,56.0575" id="Fill-95" fill="#fff"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <form className="login__form" onSubmit={this.handleSubmit}>
              <header>
                <h1>Login</h1>
              </header>
              <label>
                <span className="d-block">Email</span>
                <input type="text" value={this.state.email} onChange={this.handleEmailChange} onBlur={this.handleEmailValidation} />
                <FieldMessage msg={this.state.v.errors.email}></FieldMessage>
              </label>
              <label>
                <span className="d-block">Password</span>
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} onBlur={this.handlePasswordValidation} />
                <FieldMessage msg={this.state.v.errors.password}></FieldMessage>
              </label>
              <div>
                <input type="submit" value="Login" />
              </div>
            </form>
            {this.state.errorMsg && <FlashMessage msg={this.state.errorMsg}></FlashMessage>}
          </div>
        </div>
      </LoginPage>
    )
  }

}

export default Login;

const LoginPage = styled.div`
  
  align-items: center
  background-color: ${ colors.blueDark };
  display: flex;
  height: 100vh;
  min-height: 600px;
  justify-content: center;

  h1 {
    color: ${ colors.blueDark };
    margin: 0;
    margin-bottom: 40px;
  }

  label {
    color: ${ colors.blueDark };
    display: block;
    margin: 25px 0;
    span {
      margin-bottom: 5px;
    }
  }

  input {
    background-color: transparent;
    border: 1px solid ${ colors.offWhite };
    border-bottom: 1px solid ${ colors.blueDark };
    color: ${ colors.blueDark };
    display: block;
    font-size: 0.85rem;
    padding: 5px 5px 5px 0;
    transition: 0.2s all ease-in-out;
    width: 100%;
  }

  input:active,
  input:focus {
    border-bottom-color: ${ colors.blueBright };
    color: ${ colors.blueBright };
    outline: 0;
  }

  input:-webkit-autofill {
    -webkit-border: ${ colors.blueDark };
    -webkit-box-shadow: 0 0 0 50px ${ colors.offWhite } inset;
    -webkit-text-fill-color: ${ colors.blueDark };
    transition: 0.2s all ease-in-out;
  }

  input:-webkit-autofill:focus {
    -webkit-border-color: ${ colors.blueBright };
    -webkit-box-shadow: 0 0 0 50px ${ colors.offWhite } inset;
    -webkit-text-fill-color: ${ colors.blueBright };
  } 

  input[type="submit"] {
    background-color: ${ colors.blueDark };
    border: none;
    border-radius: 2px;
    color: ${ colors.offWhite };
    cursor: pointer;
    font-size: 1rem;
    margin-top: 40px;
    padding: 20px 5px;
    transition: 0.2s all ease-in-out;
  }

  input[type="submit"]:active,
  input[type="submit"]:hover,
  input[type="submit"]:focus {
    background-color: ${ colors.green };
    color: ${ colors.offWhite };
  }

  .login__wrap {
    width: 100%;
    margin: 0 15px;
  }

  .login__logo {
    margin-bottom: 25px;
    text-align: center;
  }

  .login__form__container {
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
  }

  .login__form {
    background-color: ${ colors.offWhite };
    border-radius: 2px;
    box-shadow: 0 0 2px #222;
    margin-bottom: 25px;
    padding: 50px;
  }

  .login__msg {
    background-color: ${ colors.red };
    border-radius: 2px;
    box-shadow: 0 0 1px #222;
    color: ${ colors.offWhite };
    font-size: 0.75rem;
    line-height: 1rem;
    margin-bottom: 25px;
    padding: 15px 50px;

    p {
      margin: 0;
    }

  }

  .errormsg {
    background-color: ${ colors.red };
    border-radius: 5px;
    color: ${ colors.offWhite };
    display: inline-block;
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 2px 5px;
    margin-top: 10px;

    p {
      margin: 0;
    }
  }

`;