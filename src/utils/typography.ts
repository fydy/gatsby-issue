import Typography from 'typography';
// @ts-ignore
import Wordpress2016 from 'typography-theme-wordpress-2016';

import theme from '../styles/theme';

const themeColor = '#FA7268';

// @ts-ignore
// tslint:disable-next-line:no-shadowed-variable
Wordpress2016.overrideThemeStyles = ({ rhythm }) => ({
  body: {
    color: '#2e3444',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: Wordpress2016.headerFontFamily.join(','),
    fontWeight: '400',
  },
  a: {
    boxShadow: `0 1px 0 0 ${theme.themeColor}`,
    color: theme.themeColor,
    textDecoration: 'none',
  },
  p: {
    lineHeight: rhythm(1),
    marginBottom: rhythm(1 / 2),
  },
  li: {
    lineHeight: rhythm(1),
    marginBottom: '0',
  },
  blockquote: {
    marginRight: 0,
    marginTop: rhythm(1),
    paddingTop: rhythm(1 / 3),
    paddingBottom: rhythm(1 / 3),
    background: '#fafafa',
    fontSize: rhythm(4 / 7),
    borderLeft: `${rhythm(1 / 8)} solid ${theme.themeColor}`,
  },
});

Wordpress2016.headerFontFamily = ['Georgia', 'serif'];
Wordpress2016.bodyFontFamily = [
  '-apple-system',
  'Helvetica Neue',
  'PingFang SC',
  'Microsoft YaHei',
  'WenQuanYi Micro Hei',
  'sans-serif',
];

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };
