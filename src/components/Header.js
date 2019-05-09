import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class extends React.Component {

  render() {
    return (
      <StyledHeader>
        <div className="container">
          <h1>{this.props.pageName}</h1>
        </div>
      </StyledHeader>
    );
  }

}

const StyledHeader = styled.div`

  background-color: ${ colors.blueDark };
  color: ${ colors.offWhite };
  padding: 10px 0;

`;