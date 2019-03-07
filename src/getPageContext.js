import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// Custom style
// https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=78e2a9&secondary.color=ffe664&primary.text.color=3d3d3d&secondary.text.color=a8a8a8
const custom = {
  palette: {
    primary: {
      light: "#abffdb",
      main: "#78e2a9",
      dark: "#44af7a",
    },
    secondary: {
      light: "#ffff96",
      main: "#ffe664",
      dark: "#c9b432",
    },
  },
  typography: {
    useNextVariants: true,
  },
}

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme(custom);

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}