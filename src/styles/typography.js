import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: 'Roboto',
      styles: ['300', '500', '700'],
    },
    {
      name: 'Merriweather',
      styles: ['400', '400i', '700','700i'],
    },
  ],
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Roboto', 'sans-serif'],
});

export default typography;