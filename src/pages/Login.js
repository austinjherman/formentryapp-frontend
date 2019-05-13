import React from 'react';
import Logo from '../components/Logo';
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
              <Logo width="75px" />
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