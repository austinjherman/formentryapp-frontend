import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetch('http://local.formapp.api.com/api/v1/user', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.formentrytoken }`
      },
    }).then(
      (response) => {
        response.json().then(
          (responseData) => {
            this.setState({user: responseData.data});
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  render() {
    return (
      <StyledHeader>
        <div className="header__logo-nav">
          <div className="container">
            <div className="row">
              <div className="col-sm-2 logo">
                <Logo height="60px" width="60px" />
              </div>
              <div className="col-sm-8 d-flex align-items-center nav">
                <nav>
                  <ul>
                    <li><Link to="/dashboard" className={
                      this.props.pageName === 'Dashboard' ? `active` : null
                    }>Dashboard</Link></li>
                    <li><Link to="/filters" className={
                      this.props.pageName === 'Filters' ? `active` : null
                    }>Filters</Link></li>
                  </ul>
                </nav>
              </div>
              <div className="col-sm-2 account">
                {
                  this.state.user
                    ? <div className="d-flex align-items-center">
                        <i className="fas fa-user"></i><p>Hi, { this.state.user.first_name }.</p>
                      </div>
                    : null
                }
              </div>
            </div>
          </div>
        </div>
      </StyledHeader>
    );
  }

}

const StyledHeader = styled.div`

  background-color: ${ colors.blueDark };
  color: ${ colors.offWhite };
  padding: 15px 0;

  p {
    margin: 0 0 0 10px;
  }

  .pagename {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.125rem;
    margin: 0;
    text-transform: uppercase;
  }

  .fas.fa-user {
    border: 1px solid ${ colors.offWhite };
    border-radius: 50%;
    //height: 31px;
    padding: 8px 8px 10px 8px;
    text-align: center;
    width: 36px;
  }

  nav {
    display: inline-block;
    padding: 0 15px;
    width: auto;
  
    ul {
      color: ${colors.offWhite};
      font-size: 0.9rem;
      list-style: none;
      margin: 0;
      padding: 0;
      
      li {
        display: inline-block;
        margin: 0 10px;

        &:first-of-type {
          margin-left: 0;
        }
      }
      
      a {
        border-bottom: 1px solid transparent;
        color: ${colors.offWhite};
        padding: 5px;
        transition: all 0.2s ease-in-out;
      
        &.active,
        &:active,
        &:focus,
        &:hover {
          border-bottom: 1px solid ${colors.offWhite};
          color: #fff;
          text-decoration: none;
        }
      }
    }

    svg {
      display: inline-block;
      max-height: 500px;
      width: auto;
    }

  }

`;