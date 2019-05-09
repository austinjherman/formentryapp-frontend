import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html {
    overflow: auto;
  }

  body {
    font-family: 'Lato', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
  }

  .d-block {
    display: block;
  }

`;

export default GlobalStyle;