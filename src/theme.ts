import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  // #1
  mixins: {
    toolbar: {
      minHeight: 50,
    },
  },
  palette: {
    primary: {
      light: "#b6ffff",
      main: "#81d4fa",
      dark: "#4ba3c7",
      contrastText: "#222222",
    },
    secondary: {
      light: "#92c4f7",
      main: "#6094c4",
      dark: "#2b6693",
      contrastText: "#fff",
    },
  },
  typography: {
    fontSize: 12,
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        minHeight: 50,
      },
    },
    MuiButton: {
      textSecondary: {
        "&:hover": {
          backgroundColor: "rgba(96, 106, 140, 0.1)",
        },
      },
    },
  },
});

export const headerButton = (props: boolean) => {
  let styles;
  let baseStyles = {
    height: "100%",
    color: "#444",
    fontSize: "0.8rem",
    borderRadius: "0",
  };
  if (props) {
    styles = {
      ...baseStyles,
      width: "100%",
      height: "3rem",
      borderBottom: "1px solid #4084b4",
      flexShrink: 0,
      paddingLeft: "1rem",
      justifyContent: "left",
    };
  } else {
    styles = {
      ...baseStyles,
      color: "#fff",
      padding: "0 1.5rem",
      borderLeft: "3px solid #4084b4",
    };
  }
  return styles;
};
