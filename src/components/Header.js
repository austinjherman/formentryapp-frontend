import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

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
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <p className="pagename">{this.props.pageName}</p>
            {
              this.state.user
                ? <div className="d-flex align-items-center">
                    <i className="fas fa-user"></i><p>Hi, { this.state.user.first_name }.</p>
                  </div>
                : null
            }
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

`;