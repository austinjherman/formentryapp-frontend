import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

export default () => (
  
  <StyledSpinner>
    <i className="fas fa-spinner"></i>
  </StyledSpinner>

)

const StyledSpinner = styled.span`

  i {
    animation: spin 1s linear infinite;
    color: ${colors.blueBright};
    font-size: 1.25rem;
    margin-left: 15px;
  }

  @keyframes spin {
    0% { 
      transform:rotate(0deg); 
    }

    100% {
      transform:rotate(360deg); 
    }
  }

`;

