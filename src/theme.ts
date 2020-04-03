import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  // #1
  palette: {
    primary: {
      light: "#b6ffff",
      main: "#81d4fa",
      dark: "#4ba3c7",
      contrastText: "#222222",
    },
    secondary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#dddddd",
    },
  },
});
