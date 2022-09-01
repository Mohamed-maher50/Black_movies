import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
function Theme(props) {
  const theme = createTheme({
    typography: {
      h5: {
        color: "#DFF6FF",
        fontWeight: "bold",
        margin: "30px 0px",
        width: "fit-content",
      },
    },
  });
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default Theme;
