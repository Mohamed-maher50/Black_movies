import React from "react";
import { Box } from "@mui/material";
function Footer() {
  return (
    <Box height={"250px"} position={"relative"} overflow={"hidden"} mt="30px">
      <img src="/imgs/footer.jpg" alt="footer image" width={"100%"} />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: "0px",
          backgroundColor: "rgba(6 ,40, 61,.3)",
          height: "100%",
          bottom: "0px",
        }}
      ></Box>
    </Box>
  );
}

export default Footer;
