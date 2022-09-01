import React, { useContext, useEffect, useState } from "react";
import { Box, Stack, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Search from "../search/Search";
import LoadingAnimate from "../context/ContextLoading";
import fetchData from "../../fetchData/fetch";
import "./Navbar.css";
function Navbar() {
  const { setLanguage, language } = useContext(LoadingAnimate);
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    const getLanguage = async () => {
      const resLang = await fetchData(
        "https://api.themoviedb.org/3/configuration/languages",
        null
      );
      setLanguages(resLang);
    };
    if (!languages) {
      getLanguage();
    }
  }, []);
  const handleSelect = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <Box
        width={"100%"}
        bgcolor="#06283D"
        position={"relative"}
        sx={{
          boxShadow: "0px 0px 20px -8px #DFF6FF",
          marginBottom: "50px",
        }}
        p="10px"
      >
        <Container maxWidth="xl">
          <Stack direction={"row"}>
            <Box width={"20%"} className="logo">
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    WebkitTextStroke: "2px #DFF6FF",
                    textTransform: "uppercase",
                    textShadow: "0px 6px 14px #DFF6FF",
                    letterSpacing: "5px",
                  }}
                >
                  Black Movies
                </Typography>
              </Link>
            </Box>
            <Box width={"80%"} justifyContent="flex-end" display={"flex"}>
              <Search />

              {languages && (
                <select onChange={handleSelect} value={language}>
                  {languages.map((lang) => {
                    return (
                      <option value={lang.iso_639_1} key={lang.iso_639_1}>
                        {lang.english_name}
                      </option>
                    );
                  })}
                </select>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
