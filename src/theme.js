import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1c4e80",
    },
    secondary: {
      main: "#ea6a47",
    },
  },
  typography: {
    fontFamily: "nunito",
    fontWeightBold: 500,
    fontSize: 14,
    fontWeightMedium: true,

    button: {
      textTransform: "none",
    },

    h1: {
      fontWeight: 300,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      marginBlock: 0,
    },

    h2: {
      fontWeight: 600,
      fontSize: "1.6rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.2rem",
      lineHeight: 1,
      letterSpacing: "0em",
    },
    body1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
  },
});
